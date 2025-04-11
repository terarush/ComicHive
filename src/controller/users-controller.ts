import { Hono } from "hono";
import { authMiddleware } from "../middleware/middleware";
import { UsersService } from "../service/users-service";

export const usersController = new Hono<{
  Variables: { token: string; userId: string };
}>({});

usersController.get("/", authMiddleware, async (c) => {
  const response = await UsersService.getUsers();
  return c.json({
    data: response,
  });
});
