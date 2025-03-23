import { Hono } from "hono";
import { authController } from "../controller/auth-controller";

const r = new Hono();

r.route('/auth', authController);

export default r;
