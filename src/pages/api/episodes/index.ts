import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchFinalSpacePaginatedEpisodes } from "@/lib";
import { PaginatedEpisodePreviews, ResponseErrorWithMessage } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedEpisodePreviews | ResponseErrorWithMessage>
) {
  const validatedQuery = validateRequestQuery(req.query);
  const page: number = +(req.query.page || 1);
  const perPage = +(req.query.perPage || 10);

  if (validatedQuery?.message) {
    res.status(400).json({ message: validatedQuery.message });
    return;
  }

  try {
    const data = await fetchFinalSpacePaginatedEpisodes(page, perPage);

    res.status(200).json(data);
  } catch (error: AxiosError | any) {
    res.status(error.status ?? 500).json(error.message ?? "Unknown error");
  }
}

const validateRequestQuery = (
  query: NextApiRequest["query"]
): ResponseErrorWithMessage => {
  const page = Number(query.page || 1);
  const perPage = Number(query.perPage || 10);

  if (isNaN(page) || isNaN(perPage)) {
    return { message: "Error: `page` and `perPage` must be a number." };
  }

  if (page <= 0 || perPage <= 0) {
    return { message: "Error: `page` and `perPage` must greater than zero." };
  }
};
