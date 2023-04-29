import {
  EpisodePreview,
  EpisodePreviewCharacter,
  EpisodePreviewCharactersDictionary,
  FinalSpaceApiCharacter,
  FinalSpaceApiEpisode,
} from "@/types";

export const filterUniq = <T = any>(
  value: T,
  index: number,
  array: T[]
): boolean => array.indexOf(value) === index;

export const apiCharacterToCharacterPreview = (
  character: FinalSpaceApiCharacter
): EpisodePreviewCharacter => {
  return {
    id: character.id,
    imageUrl: character.img_url,
    name: character.name,
  };
};

export const apiEpisodeToPreview = (
  episode: FinalSpaceApiEpisode,
  charactersDetails: EpisodePreviewCharactersDictionary
): EpisodePreview => ({
  id: episode.id,
  name: episode.name,
  airDate: episode.air_date,
  imageUrl: episode.img_url,
  characters: episode.characters
    .map((urlId) => charactersDetails[urlId])
    .filter((char) => !!char),
});

export const paginateCollection = <T = any>(
  collection: T[],
  page: number,
  perPage: number
): T[] => collection.slice((page - 1) * perPage, page * perPage);
