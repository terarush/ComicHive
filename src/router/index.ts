import { Hono } from "hono";
import { authController } from "../controller/auth-controller";
import { userController } from "../controller/user-controller";
import { favoriteController } from "../controller/favorite-controller";

const r = new Hono();

r.route('/auth', authController);
r.route('/user', userController);
r.route('/favorite', favoriteController);

export default r;
