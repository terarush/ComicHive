"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgurService = void 0;
const env_1 = require("../env");
class ImgurService {
    static async uploadImage(file) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Client-ID ${env_1.ENV.IMGUR_CLIENT_ID}`,
            },
            body: formData,
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error("Failed to upload image to Imgur");
        }
        return { link: data.data.link };
    }
}
exports.ImgurService = ImgurService;
