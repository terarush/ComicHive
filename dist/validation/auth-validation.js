"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
class AuthValidation {
    static REGISTER = zod_1.z.object({
        username: zod_1.z.string().min(5).max(100),
        password: zod_1.z.string().min(1).max(100),
        email: zod_1.z.string().email().max(100),
        first_name: zod_1.z.string().max(100),
        last_name: zod_1.z.string().max(100)
    });
    static LOGIN = zod_1.z.object({
        username: zod_1.z.string().min(5).max(100),
        password: zod_1.z.string().min(1).max(100),
    });
}
exports.AuthValidation = AuthValidation;
