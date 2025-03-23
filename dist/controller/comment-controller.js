"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const hono_1 = require("hono");
const middleware_1 = require("../middleware/middleware");
const comment_service_1 = require("../service/comment-service");
exports.commentController = new hono_1.Hono();
exports.commentController.get("/:animeId", async (c) => {
    const animeId = c.req.param("animeId");
    const response = await comment_service_1.commentService.getComment(animeId);
    return c.json({
        data: response,
    });
});
exports.commentController.post("/:animeId", middleware_1.authMiddleware, async (c) => {
    const userId = c.get("userId");
    const animeId = c.req.param("animeId");
    const request = (await c.req.json());
    const response = await comment_service_1.commentService.postComment(animeId, userId, request);
    return c.json({
        data: response,
    });
});
