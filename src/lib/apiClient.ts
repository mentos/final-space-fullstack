import { PaginatedEpisodePreviews } from "@/types";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

const fetchPaginatedEpisodes = async (
  page: number,
  perPage: number = 10
): Promise<PaginatedEpisodePreviews> => {
  const params = new URLSearchParams({
    page: encodeURI(String(page || 1)),
    perPage: encodeURI(String(perPage || 10)),
  });

  const response = await client.get<PaginatedEpisodePreviews>(
    `/episodes?${params}`
  );

  return response.data;
};

export { fetchPaginatedEpisodes };
