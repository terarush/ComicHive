"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
class CommentValidation {
    static CREATE_COMMENT = zod_1.z.object({
        content: zod_1.z.string(),
    });
}
exports.CommentValidation = CommentValidation;
