import { ENV } from "../env";
export class ImgurService {
  static async uploadImage(file: File): Promise<{ link: string }> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${ENV.IMGUR_CLIENT_ID}`,
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
