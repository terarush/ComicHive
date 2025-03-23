import { Context, Next } from "hono";
import { prismaClient } from "../application/database";
import { HTTPException } from "hono/http-exception";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header("x-token");
  const user = await prismaClient.user.findFirst({
    where: {
      token: token,
    },
  });
  if (!user) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  c.set('token', token);
  return next();
};
