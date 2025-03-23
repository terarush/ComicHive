"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const database_1 = require("../application/database");
const comment_validation_1 = require("../validation/comment-validation");
class commentService {
    static async getComment(animeId) {
        const comment = await database_1.prismaClient.comment.findMany({
            where: {
                animeId,
            },
        });
        if (comment.length === 0) {
            return {
                message: "There are no comments on this anime yet.",
            };
        }
        return comment;
    }
    static async postComment(animeId, userId, request) {
        request = comment_validation_1.CommentValidation.CREATE_COMMENT.parse(request);
        const comment = await database_1.prismaClient.comment.create({
            data: {
                animeId,
                userId,
                content: request.content,
            },
        });
        return {
            message: "success",
            comment,
        };
    }
}
exports.commentService = commentService;
