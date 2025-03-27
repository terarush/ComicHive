"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
    static UPDATE_USER = zod_1.z.object({
        username: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        avatar: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        first_name: zod_1.z.string().optional(),
        last_name: zod_1.z.string().optional(),
    });
    static CHANGE_PASSWORD = zod_1.z.object({
        old_password: zod_1.z.string().min(6),
        new_password: zod_1.z.string().min(6),
    });
}
exports.UserValidation = UserValidation;
