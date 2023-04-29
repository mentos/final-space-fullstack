import { PropsWithChildren } from "react";
import { Heading } from "@/components/ui";
import type { EpisodePreview as TEpisodePreview } from "@/types";
import EpisodeImage from "./EpisodeImage";
import CharactersGrid from "./CharactersGrid";

type Props = {
  episode: TEpisodePreview;
};

const EpisodePreview: React.FC<Props> = ({ episode }) => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row md:basis-2/3">
        <EpisodeImage title={episode.name} src={episode.imageUrl} />

        <div className="flex flex-col px-4 mb-4 md:basis-1/2">
          <Heading size={2}>{episode.name}</Heading>
          <div className="text-xs md:text-base uppercase">
            Air Date: <b>{episode.airDate}</b>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:basis-1/3">
        <CharactersGrid characters={episode.characters} />
      </div>
    </Container>
  );
};

export default EpisodePreview;

const Container: React.FC<PropsWithChildren> = ({ children }) => (
  <article className="w-full flex flex-col md:flex-row pb-8 mb-10 place-content-between border-b border-b-slate-700">
    {children}
  </article>
);
