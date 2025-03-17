import { Fetch } from "../utils/Fetch";

export const fetchPopularManga = async () => {
  try {
    const response = await Fetch.get("/api/manga/popular/1");

    const apiData = response.data;
    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        upload_on: item.upload_on,
        description: item.sortDesc,
        endpoint: item.endpoint,
      }));
    }
  } catch (error) {
    console.error("Error fetching manga data:", error);
    return [];
  }
};

export const fetchMangaPage = async (page: number = 1) => {
  try {
    const response = await Fetch.get(`/api/manga/page/${page}`);
    const apiData = response.data;

    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        upload_on: item.updated_on,
        description: item.chapter,
        endpoint: item.endpoint,
      }));
    }
  } catch (error) {
    console.error("Error fetching manga page data:", error);
    return [];
  }
};
