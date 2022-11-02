"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const dayjs_1 = __importDefault(require("dayjs"));
const logged_1 = __importDefault(require("./middlewares/logged"));
require("../db/models/Note");
const User_1 = __importDefault(require("../db/models/User"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    const { password, username } = data;
    const UserDBData = yield User_1.default.findOne({ username });
    if (!UserDBData || UserDBData.passwordHash === undefined) {
        next({ type: 'missing' });
    }
    else {
        const { passwordHash } = UserDBData;
        const match = yield bcrypt_1.default.compare(password, passwordHash);
        if (match) {
            const userPopulated = yield User_1.default.findOne({ username, passwordHash }).populate('notes');
            const DataToJWT = { id: UserDBData.id, username: UserDBData.username };
            const token = jsonwebtoken_1.default.sign(DataToJWT, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
            res.cookie('token', JSON.stringify(token), {
                httpOnly: true,
                expires: (0, dayjs_1.default)().add(1, 'days').toDate(),
                sameSite: 'none',
                secure: true
            }).header('Access-Control-Allow-Credentials', 'true').status(200).send(userPopulated).end();
        }
        else
            next({ type: 'bad' });
    }
}));
router.get('/', logged_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(res.locals.decoded);
}));
exports.default = router;
