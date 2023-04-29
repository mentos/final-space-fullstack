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

export {
  EpisodePreview,
  EpisodePreviewCharacter,
  EpisodePreviewCharactersDictionary,
  FinalSpaceApiCharacter,
  FinalSpaceApiEpisode,
};
