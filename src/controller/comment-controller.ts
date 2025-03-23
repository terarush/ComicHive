import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { commentService } from "../service/comment-service";
import { CreateCommentRequest } from "../model/comment-model";

export const commentController = new Hono<{
  Variables: { token: string; userId: string };
}>();

commentController.use("*", authMiddleware);

commentController.get("/:animeId", async (c) => {
  const animeId = c.req.param("animeId") as string;
  const response = await commentService.getComment(animeId);
  return c.json({
    data: response,
  });
});

commentController.post("/:animeId", async (c) => {
  const userId = c.get("userId");
  const animeId = c.req.param("animeId") as string;
  const request = (await c.req.json()) as CreateCommentRequest;
  const response = await commentService.postComment(animeId, userId, request);
  return c.json({
    data: response,
  });
});
