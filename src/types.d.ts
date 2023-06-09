type EpisodePreview = {
  airDate: string;
  characters: EpisodePreviewCharacter[];
  id: number;
  imageUrl: string;
  name: string;
};

type EpisodePreviewCharacter = { id: number; imageUrl: string; name: string };

type EpisodePreviewCharactersDictionary = {
  [urlId: string]: EpisodePreviewCharacter;
};

type FinalSpaceApiEpisode = {
  air_date: string;
  characters: string[];
  director: string;
  id: number;
  img_url: string;
  name: string;
  writer: string;
};

type FinalSpaceApiCharacter = {
  abilities: string[];
  alias: string[];
  gender: string;
  hair: string;
  id: number;
  img_url: string;
  name: string;
  origin: string;
  species: string;
  status: string;
};

type PaginatedEpisodePreviews = {
  items: EpisodePreview[];
  error: string | null;
  meta: { pagination: Pagination };
};

type ResponseErrorWithMessage = { message: string } | undefined;

type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export {
  EpisodePreview,
  EpisodePreviewCharacter,
  EpisodePreviewCharactersDictionary,
  FinalSpaceApiCharacter,
  FinalSpaceApiEpisode,
  PaginatedEpisodePreviews,
  Pagination,
  ResponseErrorWithMessage,
};
