"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dayjs_1 = __importDefault(require("dayjs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: (0, dayjs_1.default)().millisecond(1).toDate(),
        sameSite: 'none',
        secure: true
    }).header('Access-Control-Allow-Credentials', 'true').status(200).end();
});
exports.default = router;
