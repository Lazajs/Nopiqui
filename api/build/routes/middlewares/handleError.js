"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        case 'redirect':
            res.redirect('/');
            break;
        default:
            res.status(444).send({ error: 'No response' });
    }
};
exports.default = handleError;
