import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import {
  CreateCommentRequest,
  ReplyCommentRequest,
} from "../model/comment-model";
import { CommentService } from "../service/comment-service";

export const commentController = new Hono<{
  Variables: { token: string; userId: string };
}>();

commentController.post("/reply", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const request = (await c.req.json()) as ReplyCommentRequest;
  const response = await CommentService.replyComment(userId, request);
  return c.json({
    data: response,
  });
});

commentController.delete("/reply/:replyId", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const replyId = c.req.param("replyId") as string;
  const response = await CommentService.deleteReplyComment(userId, replyId);
  return c.json({
    data: response,
  });
});

commentController.get("/:animeId", async (c) => {
  const animeId = c.req.param("animeId") as string;
  const response = await CommentService.getComment(animeId);
  return c.json({
    data: response,
  });
});

commentController.post("/:animeId", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const animeId = c.req.param("animeId") as string;
  const request = (await c.req.json()) as CreateCommentRequest;
  const response = await CommentService.postComment(animeId, userId, request);
  return c.json({
    data: response,
  });
});

commentController.delete("/:commentId", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const commentId = c.req.param("commentId") as string;
  const response = await CommentService.deleteComment(userId, commentId);
  return c.json({
    data: response,
  });
});
