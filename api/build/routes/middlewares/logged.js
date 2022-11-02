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
exports.isLogged = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logged = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies && req.cookies === undefined)
        next({ type: 'auth' });
    const { token } = req.cookies;
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(JSON.parse(token), process.env.JWT_SECRET);
        res.locals.decoded = decoded;
        next();
    }
    else {
        next({ type: 'auth' });
    }
});
const isLogged = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies && req.cookies.token !== undefined) {
        const { token } = req.cookies;
        const decoded = jsonwebtoken_1.default.verify(JSON.parse(token), process.env.JWT_SECRET);
        res.locals.logged = decoded ? true : false;
    }
    next();
});
exports.isLogged = isLogged;
exports.default = logged;
