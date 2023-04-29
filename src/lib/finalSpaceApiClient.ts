import axios from "axios";
import {
  EpisodePreviewCharactersDictionary,
  FinalSpaceApiEpisode,
  PaginatedEpisodePreviews,
} from "@/types";
import {
  apiCharacterToCharacterPreview,
  apiEpisodeToPreview,
  filterUniq as unique,
  paginateCollection,
} from "@/utils";

const client = axios.create({
  baseURL: "https://finalspaceapi.com/api",
});

export const fetchFinalSpacePaginatedEpisodes = async (
  page: number,
  perPage: number = 10
): Promise<PaginatedEpisodePreviews> => {
  const apiEpisodesReponse = await client.get<FinalSpaceApiEpisode[]>(
    "/v0/episode"
  );

  const apiEpisodes = paginateCollection<FinalSpaceApiEpisode>(
    apiEpisodesReponse.data,
    page,
    perPage
  );

  const charactersUrls: string[] = apiEpisodes
    .flatMap(({ characters }) => characters)
    .filter(unique);

  const apiCharactersResponses = await Promise.allSettled(
    charactersUrls.map((url) => client.get(url))
  );

  const episodeCharacters = apiCharactersResponses.reduce(
    (dictionary, response) => {
      if (response.status === "fulfilled" && response.value.config.url) {
        dictionary[response.value.config.url] = apiCharacterToCharacterPreview(
          response.value.data
        );
      }

      return dictionary;
    },
    {} as EpisodePreviewCharactersDictionary
  );

  const total = apiEpisodesReponse.data.length;
  const totalPages = Math.ceil(total / perPage);
  const episodes = apiEpisodes.map((episode) =>
    apiEpisodeToPreview(episode, episodeCharacters)
  );

  return {
    error: null,
    items: episodes,
    meta: { pagination: { page, perPage, total, totalPages } },
  };
};
