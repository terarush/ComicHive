import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { FavoriteService } from "../service/favorite-controller";

export const favoriteController = new Hono<{
  Variables: { token: string; userId: string };
}>();

favoriteController.use("*", authMiddleware);

favoriteController.get("/", async (c) => {
  const userId = c.get("userId") as string;
  const response = await FavoriteService.getFavorite(userId);
  return c.json({
    data: response
  })
});
