"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const http_exception_1 = require("hono/http-exception");
const zod_1 = require("zod");
const cors_1 = require("hono/cors");
const router_1 = __importDefault(require("./router"));
const app = new hono_1.Hono();
app.use("*", (0, cors_1.cors)());
app.get("/", async (c) => {
    c.text("API Client is ready!!");
});
app.route("/api/v1", router_1.default);
app.onError(async (err, c) => {
    if (err instanceof http_exception_1.HTTPException) {
        c.status(err.status);
        return c.json({
            errors: [{ message: err.message }],
        });
    }
    else if (err instanceof zod_1.ZodError) {
        c.status(400);
        return c.json({
            errors: err.errors,
        });
    }
    else {
        c.status(500);
        return c.json({
            errors: [{ message: err.message }],
        });
    }
});
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
