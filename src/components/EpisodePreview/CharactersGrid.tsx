import { EpisodePreviewCharacter } from "@/types";
import { Heading } from "@/components/ui";
import CharacterImage from "./CharacterImage";

type Props = {
  characters: EpisodePreviewCharacter[];
};

const CharactersGrid: React.FC<Props> = ({ characters }) => (
  <>
    <Heading size={3}>Episode Characters</Heading>
    <div className="w-full grid grid-cols-4 gap-4 px-4 md:px-0">
      {characters.map((character) => (
        <CharacterImage
          key={`${character.id}-${character.name}`}
          src={character.imageUrl}
          title={character.name}
        />
      ))}
    </div>
  </>
);

export default CharactersGrid;
