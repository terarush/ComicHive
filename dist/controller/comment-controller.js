"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const hono_1 = require("hono");
const middleware_1 = require("../middleware/middleware");
const comment_service_1 = require("../service/comment-service");
exports.commentController = new hono_1.Hono();
exports.commentController.post("/reply", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const request = (await c.req.json());
    const response = await comment_service_1.CommentService.replyComment(userId, request);
    return c.json({
        data: response,
    });
});
exports.commentController.delete("/reply/:replyId", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const replyId = c.req.param("replyId");
    const response = await comment_service_1.CommentService.deleteReplyComment(userId, replyId);
    return c.json({
        data: response,
    });
});
exports.commentController.get("/:animeId", async (c) => {
    const animeId = c.req.param("animeId");
    const response = await comment_service_1.CommentService.getComment(animeId);
    return c.json({
        data: response,
    });
});
exports.commentController.post("/:animeId", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const animeId = c.req.param("animeId");
    const request = (await c.req.json());
    const response = await comment_service_1.CommentService.postComment(animeId, userId, request);
    return c.json({
        data: response,
    });
});
exports.commentController.delete("/:commentId", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const commentId = c.req.param("commentId");
    const response = await comment_service_1.CommentService.deleteComment(userId, commentId);
    return c.json({
        data: response,
    });
});
