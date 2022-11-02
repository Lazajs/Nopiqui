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
const logged_1 = __importDefault(require("./middlewares/logged"));
const Note_1 = __importDefault(require("../db/models/Note"));
const router = (0, express_1.Router)();
router.get('/:id', logged_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id === undefined)
        next({ type: 'bad' });
    const self = yield Note_1.default.findById(id);
    if (!self)
        next({ type: 'missing' });
    else {
        self.archived = self.archived === true ? false : true;
        yield self.save();
        res.status(201).end();
    }
}));
exports.default = router;
