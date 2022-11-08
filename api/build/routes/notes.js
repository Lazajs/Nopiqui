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
const Note_1 = __importDefault(require("../db/models/Note"));
const User_1 = __importDefault(require("../db/models/User"));
const logged_1 = __importDefault(require("./middlewares/logged"));
const populate_1 = __importDefault(require("./middlewares/populate"));
const archive_1 = __importDefault(require("./archive"));
const logged_2 = require("./middlewares/logged");
const router = (0, express_1.Router)();
router.use('/archive', archive_1.default);
router.get('/', logged_1.default, populate_1.default, (req, res, next) => {
    var _a;
    const populated = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.populated;
    if (populated !== undefined) {
        res.status(200).send(populated).end();
    }
    else {
        next({ type: 'auth' });
    }
});
router.get('/:id', logged_2.isLogged, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === '')
        next({ type: 'bad' });
    const findIt = yield Note_1.default.findById(req.params.id);
    if (findIt) {
        if (!findIt.archived)
            res.send(findIt);
        else if (findIt.archived && findIt.userId === res.locals.logged)
            res.send(findIt);
        next({ type: 'auth' });
    }
    else {
        next({ type: 'missing' });
    }
}));
router.post('/create', logged_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, content, title } = req.body;
    const isEqualExistent = yield Note_1.default.findOne({ title, content });
    const foundUser = yield User_1.default.findById(userId);
    if (isEqualExistent !== undefined && (isEqualExistent === null || isEqualExistent === void 0 ? void 0 : isEqualExistent.content) === content && (isEqualExistent === null || isEqualExistent === void 0 ? void 0 : isEqualExistent.title) === title) {
        next({ type: 'conflict' });
    }
    else if (foundUser !== undefined && (foundUser === null || foundUser === void 0 ? void 0 : foundUser.notes) !== undefined) {
        console.log(foundUser.username);
        const created = new Note_1.default({ userId: userId, content: content, title: title, archived: false, created: new Date().toLocaleDateString(), author: foundUser.username });
        const { id } = created;
        foundUser.notes = foundUser.notes.concat(id);
        yield foundUser.save();
        yield created.save();
        res.send(created).status(201);
    }
    else {
        next({ type: 'auth' });
    }
}));
router.delete('/:noteId', logged_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const isDeleted = yield Note_1.default.findByIdAndDelete(noteId);
    if (isDeleted && (isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted.userId) !== undefined) {
        const owner = yield User_1.default.findById(isDeleted.userId);
        const newOnes = owner.notes.filter((e) => {
            return String(e) !== noteId;
        });
        owner.notes = newOnes;
        yield owner.save();
        res.status(200).end();
    }
    else {
        next({ type: 'missing' });
    }
}));
router.put('/', logged_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { title, content, id } = body;
    const edited = yield Note_1.default.findByIdAndUpdate(id, { title: title, content: content }, { new: true });
    if ((edited === null || edited === void 0 ? void 0 : edited.id) !== undefined) {
        res.send(edited).status(201).end();
    }
    else
        next({ type: 'missing' });
}));
exports.default = router;
