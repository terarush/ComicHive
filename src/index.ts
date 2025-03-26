import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { cors } from "hono/cors";
import r from "./router";

const app = new Hono();

app.use("*", cors());

app.get("/", async (c: any) => {
  c.text("API Client is ready!!");
});
app.route("/api/v1", r);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      errors: [{ message: err.message }],
    });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      errors: err.errors,
    });
  } else {
    c.status(500);
    return c.json({
      errors: [{ message: err.message }],
    });
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);