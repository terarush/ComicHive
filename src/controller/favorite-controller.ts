import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { FavoriteService } from "../service/favorite-controller";
import {
  CreateFavoriteRequest,
  DeleteFavoriteRequest,
} from "../model/favorite-model";

export const favoriteController = new Hono<{
  Variables: { token: string; userId: string };
}>();

favoriteController.use("*", authMiddleware);

favoriteController.get("/", async (c) => {
  const userId = c.get("userId") as string;
  const response = await FavoriteService.getFavorite(userId);
  return c.json({
    data: response,
  });
});

favoriteController.post("/", async (c) => {
  const userId = c.get("userId") as string;
  const request = (await c.req.json()) as CreateFavoriteRequest;
  const response = await FavoriteService.postFavorite(userId, request);
  return c.json({
    data: response,
  });
});

favoriteController.delete("/", async (c) => {
  const userId = c.get("userId") as string;
  const request = (await c.req.json()) as DeleteFavoriteRequest;
  const response = await FavoriteService.deleteFavorite(userId, request);
  return c.json({
    data: response,
  });
});
