"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteValidation = void 0;
const zod_1 = require("zod");
class FavoriteValidation {
    static CREATE_FAVORITE = zod_1.z.object({
        anime_id: zod_1.z.string(),
    });
    static DELETE_FAVORITE = zod_1.z.object({
        anime_id: zod_1.z.string(),
    });
}
exports.FavoriteValidation = FavoriteValidation;
