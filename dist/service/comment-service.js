"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const http_exception_1 = require("hono/http-exception");
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
            where: {
                animeId,
            },
            select: {
                id: true,
                content: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        role: true,
                        created_at: true,
                        updated_at: true,
                    },
                },
                replies: {
                    select: {
                        id: true,
                        content: true,
                        created_at: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                                role: true,
                                created_at: true,
                            },
                        },
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
    static async deleteComment(userId, commentId) {
        const comment = await database_1.prismaClient.comment.findUnique({
            where: { id: commentId, userId },
        });
        if (!comment) {
            throw new http_exception_1.HTTPException(404, { message: "Comment not found" });
        }
        await database_1.prismaClient.comment.delete({
            where: {
                id: commentId,
            },
        });
        return { message: "Comment deleted" };
    }
    static async replyComment(userId, request) {
        request = comment_validation_1.CommentValidation.REPLY_COMMENT.parse(request);
        const comment = await database_1.prismaClient.comment.findUnique({
            where: { id: request.comment_id },
        });
        if (!comment) {
            throw new http_exception_1.HTTPException(404, { message: "Comment not found" });
        }
        const reply = await database_1.prismaClient.replyComment.create({
            data: {
                userId,
                content: request.content,
                commentId: request.comment_id,
                created_at: new Date(),
            },
            select: {
                id: true,
                content: true,
                created_at: true,
            },
        });
        return reply;
    }
    static async deleteReplyComment(userId, replyId) {
        const reply = await database_1.prismaClient.replyComment.findUnique({
            where: { id: replyId, userId },
        });
        if (!reply) {
            throw new http_exception_1.HTTPException(404, { message: "Reply not found" });
        }
        await database_1.prismaClient.replyComment.delete({
            where: {
                id: replyId,
            },
        });
        return { message: "Reply deleted" };
    }
}
exports.CommentService = CommentService;
