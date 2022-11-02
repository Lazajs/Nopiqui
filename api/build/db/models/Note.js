"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: String,
    userId: { type: String, required: true },
    created: { type: String, required: true },
    archived: { type: Boolean, required: true },
    author: { type: String, required: true }
});
noteSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = mongoose_1.default.model('Note', noteSchema);
