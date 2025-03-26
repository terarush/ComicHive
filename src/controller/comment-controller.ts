import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import {
  CreateCommentRequest,
} from "../model/comment-model";
import { CommentService } from "../service/comment-service";

export const commentController = new Hono<{
  Variables: { token: string; userId: string };
}>();

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
