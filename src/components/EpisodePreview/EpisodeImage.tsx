import Image from "next/image";

type Props = {
  src: string;
  title: string;
};

const EpisodeImage: React.FC<Props> = ({ src, title }) => (
  <div className="relative mb-3 basis-1 md:basis-1/2 grow border border-black">
    <div className="aspect-video">
      <Image
        alt={title}
        blurDataURL={process.env.defaultBlurDataURL}
        className="object-cover"
        fill
        placeholder="blur"
        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
        src={src}
        title={title}
      />
    </div>
  </div>
);

export default EpisodeImage;
