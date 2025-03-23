import { Hono } from "hono";
import { authController } from "../controller/auth-controller";
import { userController } from "../controller/user-controller";

const r = new Hono();

r.route('/auth', authController);
r.route('/user', userController);

export default r;
