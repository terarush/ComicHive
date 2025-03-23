"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const auth_controller_1 = require("../controller/auth-controller");
const r = new hono_1.Hono();
r.route('/auth', auth_controller_1.authController);
exports.default = r;
