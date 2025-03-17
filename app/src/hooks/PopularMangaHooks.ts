import axios from "axios";

export const fetchPopularManga = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_MANGA_API}/api/manga/popular/1`
    );

    const apiData = response.data;
    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        upload_on: item.upload_on || "No upload info",
        description: item.sortDesc || "No description available.",
      }));
    }
  } catch (error) {
    console.error("Error fetching manga data:", error);
    return [];
  }
};
