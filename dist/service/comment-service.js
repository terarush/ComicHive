"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const database_1 = require("../application/database");
const comment_validation_1 = require("../validation/comment-validation");
class CommentService {
    static async getComment(animeId) {
        const commentCount = await database_1.prismaClient.comment.count({
            where: { animeId },
        });
        if (commentCount === 0) {
            return { message: "There are no comments on this anime yet." };
        }
        const comments = await database_1.prismaClient.comment.findMany({
            where: { animeId },
            select: {
                id: true,
                content: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
            },
        });
        return comments;
    }
    static async postComment(animeId, userId, request) {
        request = comment_validation_1.CommentValidation.CREATE_COMMENT.parse(request);
        const comment = await database_1.prismaClient.comment.create({
            data: {
                animeId,
                userId,
                content: request.content,
                created_at: new Date(),
            },
            select: {
                id: true,
                content: true,
                created_at: true,
            },
        });
        return { message: "Success", comment };
    }
}
exports.CommentService = CommentService;
