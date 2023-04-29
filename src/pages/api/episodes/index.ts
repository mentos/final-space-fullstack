import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchFinalSpacePaginatedEpisodes } from "@/lib";
import { PaginatedEpisodePreviews } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedEpisodePreviews | { error: string }>
) {
  const page: number = +(req.query.page || 1);
  const perPage = +(req.query.perPage || 10);

  if (isNaN(page) || isNaN(perPage)) {
    res
      .status(400)
      .json({ error: "Error: `page` and `perPage` must be a number." });

    return;
  }

  if (page <= 0 || perPage <= 0) {
    res
      .status(400)
      .json({ error: "Error: `page` and `perPage` must greater than zero." });

    return;
  }

  try {
    const data = await fetchFinalSpacePaginatedEpisodes(page, perPage);

    res.status(200).json(data);
  } catch (error: AxiosError | any) {
    res.status(error.status ?? 500).json(error.message ?? "Unknown error");
  }
}
