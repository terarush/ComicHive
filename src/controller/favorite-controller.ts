import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { FavoriteService } from "../service/favorite-controller";

export const favoriteController = new Hono<{ Variables: { token: string } }>();

favoriteController.use("*", authMiddleware);
favoriteController.get("/", async (c) => {
  const token = c.get("token") as string;
  const response = await FavoriteService.getFavorite(token);
  return response;
});
