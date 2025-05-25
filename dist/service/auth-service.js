"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../application/database");
const auth_validation_1 = require("../validation/auth-validation");
const http_exception_1 = require("hono/http-exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const smtp_1 = require("../application/smtp");
class AuthService {
    static async register(request) {
        request = auth_validation_1.AuthValidation.REGISTER.parse(request);
        const usernameExists = await database_1.prismaClient.user.count({
            where: { username: request.username },
        });
        if (usernameExists > 0) {
            throw new http_exception_1.HTTPException(400, { message: "Username already exists" });
        }
        const existingContact = await database_1.prismaClient.contact.findUnique({
            where: { email: request.email },
        });
        if (existingContact) {
            throw new http_exception_1.HTTPException(400, { message: "Email already exists" });
        }
        request.password = await bcrypt_1.default.hash(request.password, 10);
        const first_name = request.first_name;
        const last_name = request.last_name;
        const name = first_name + " " + last_name;
        const user = await database_1.prismaClient.user.create({
            data: {
                username: request.username,
                password: request.password,
                name: name,
                role: "MEMBER",
                contact: {
                    create: {
                        email: request.email,
                        first_name: first_name,
                        last_name: last_name,
                    },
                },
                created_at: new Date(),
            },
            select: {
                id: true,
                username: true,
                name: true,
                contact: {
                    select: {
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        return {
            message: "Register success",
            user,
        };
    }
    static async login(request) {
        request = auth_validation_1.AuthValidation.LOGIN.parse(request);
        const user = await database_1.prismaClient.user.findUnique({
            where: { username: request.username },
        });
        if (!user) {
            throw new http_exception_1.HTTPException(401, {
                message: "Username or password is wrong",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(request.password, user.password);
        if (!isPasswordValid) {
            throw new http_exception_1.HTTPException(401, {
                message: "Username or password is wrong",
            });
        }
        const token = crypto_1.default.randomUUID();
        await database_1.prismaClient.user.update({
            where: { username: request.username },
            data: { token },
        });
        return { token };
    }
    static async requestResetPassword(email) {
        const contact = await database_1.prismaClient.contact.findUnique({
            where: { email },
            include: { user: true },
        });
        if (!contact || !contact.user) {
            throw new http_exception_1.HTTPException(404, { message: "Email not found" });
        }
        const existingToken = await database_1.prismaClient.resetPasswordToken.findFirst({
            where: {
                userId: contact.user.id,
                createdAt: {
                    gte: new Date(Date.now() - 4 * 60 * 60 * 1000),
                },
            },
        });
        if (existingToken) {
            throw new http_exception_1.HTTPException(400, {
                message: "Reset password already requested recently. Please wait up to 4 hours.",
            });
        }
        const token = crypto_1.default.randomUUID();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await database_1.prismaClient.resetPasswordToken.create({
            data: {
                token,
                userId: contact.user.id,
                expiresAt,
            },
        });
        const resetLink = `https://your-app.com/reset-password?token=${token}`;
        await (0, smtp_1.sendMail)({
            to: email,
            subject: "Reset Password Request",
            html: `
        <h2>Reset Password</h2>
        <p>Klik link di bawah untuk mengatur ulang password Anda:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link ini akan kedaluwarsa dalam 4 jam.</p>
      `,
        });
        return { message: "Reset password link has been sent to your email" };
    }
    static async resetPasswordWithToken(token, newPassword) {
        const resetToken = await database_1.prismaClient.resetPasswordToken.findUnique({
            where: { token },
            include: { user: true },
        });
        if (!resetToken || !resetToken.user) {
            throw new http_exception_1.HTTPException(400, { message: "Invalid token" });
        }
        if (new Date() > new Date(resetToken.expiresAt)) {
            throw new http_exception_1.HTTPException(400, { message: "Token has expired" });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await database_1.prismaClient.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });
        await database_1.prismaClient.resetPasswordToken.delete({
            where: { token },
        });
        return { message: "Password has been reset successfully" };
    }
}
exports.AuthService = AuthService;
