"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const handleError = (error, req, res, _next) => {
    switch (error === null || error === void 0 ? void 0 : error.type) {
        case 'auth':
            res.status(401).send({ error: 'Action not authorized' });
            break;
        case 'missing':
            res.status(404).send({ error: 'Requested document not found' });
            break;
        case 'conflict':
            res.status(409).send({ error: 'Already existent' });
            break;
        case 'bad':
            res.status(400).send({ error: 'Bad at request' });
            break;
        default:
            res.sendFile(path_1.default.resolve(__dirname, '../client/build', 'index.html'));
    }
};
exports.default = handleError;
