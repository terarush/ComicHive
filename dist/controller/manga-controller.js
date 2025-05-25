"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaController = void 0;
const hono_1 = require("hono");
const env_1 = require("../env");
exports.mangaController = new hono_1.Hono();
exports.mangaController.all("/*", async (c) => {
    const subPath = c.req.path.replace(/^\/api\/v1\/manga/, "") || "/";
    const queryString = new URLSearchParams(c.req.query()).toString();
    const targetUrl = `${env_1.ENV.API_MANGA}${subPath}${queryString ? `?${queryString}` : ""}`;
    try {
        const reqHeaders = new Headers();
        c.req.raw.headers.forEach((value, key) => {
            if (!['host', 'content-length'].includes(key.toLowerCase())) {
                reqHeaders.set(key, value);
            }
        });
        const res = await fetch(targetUrl, {
            method: c.req.method,
            headers: reqHeaders,
            body: ["POST", "PUT", "PATCH"].includes(c.req.method)
                ? await c.req.raw.text()
                : undefined,
        });
        const contentType = res.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            const data = await res.json();
            return c.json(data);
        }
        const text = await res.text();
        return new Response(text, {
            status: res.status,
            headers: {
                'content-type': contentType || 'text/plain',
            },
        });
    }
    catch (error) {
        console.error("Manga proxy error:", error);
        return c.json({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: "Manga proxy error occurred",
            ok: false,
            data: null,
        }, 500);
    }
});
