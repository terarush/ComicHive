import { FetchMangaApi } from "../utils/Fetch";
export const fetchPopularManga = async () => {
  try {
    const response = await FetchMangaApi.get("/api/manga/popular/1");

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
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchMangaPage = async (page: number = 1) => {
  try {
    const response = await FetchMangaApi.get(`/api/manga/page/${page}`);
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

export const fetchMangaDetail = async (slug: string) => {
  try {
    const response = await FetchMangaApi.get(`/api/manga/detail/${slug}`);

    if (response.status === 200 && response.data.status !== false) {
      return { manga: response.data, isFound: true };
    } else {
      return {
        manga: {
          status: false,
          message: response.data.message || "Manga not found",
        },
        isFound: false,
      };
    }
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return {
      manga: { status: false, message: "Failed to fetch manga details" },
      isFound: false,
    };
  }
};

