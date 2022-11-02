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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../db/models/User"));
const router = express_1.default.Router();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = Object.assign({}, req.body);
    const { password, username } = body;
    const passwordHash = yield bcrypt_1.default.hash(password, 12).then();
    delete body.password;
    body.username = body.username.trim();
    body.created = new Date().toDateString();
    const NewUser = new User_1.default(Object.assign(Object.assign({}, body), { passwordHash }));
    const check = yield User_1.default.findOne({ username });
    if (check !== null) {
        next({ type: 'bad' });
    }
    else {
        NewUser.save()
            .then(() => res.status(201).end())
            .catch(console.log);
    }
}));
exports.default = router;
