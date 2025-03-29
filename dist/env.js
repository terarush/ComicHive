"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
exports.ENV = {
    PORT: process.env.PORT || 3000,
    IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID || null,
};
