import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { commentService } from "../service/comment-service";
import {
  CreateCommentRequest,
  ReplyCommentRequest,
} from "../model/comment-model";

export const commentController = new Hono<{
  Variables: { token: string; userId: string };
}>();

commentController.get("/:animeId", async (c) => {
  const animeId = c.req.param("animeId") as string;
  const response = await commentService.getComment(animeId);
  return c.json({
    data: response,
  });
});

commentController.post("/:animeId", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const animeId = c.req.param("animeId") as string;
  const request = (await c.req.json()) as CreateCommentRequest;
  const response = await commentService.postComment(animeId, userId, request);
  return c.json({
    data: response,
  });
});

commentController.post("/reply", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const request = (await c.req.json()) as ReplyCommentRequest;
  const response = await commentService.replyComment(userId, request);
  return c.json({
    data: response,
  });
});

commentController.delete("/reply", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const { reply_id } = await c.req.json();

  const response = await commentService.deleteReply(userId, reply_id);

  if (response.error) {
    return c.json({ error: response.error }, 400);
  }

  return c.json({
    data: response,
  });
});
