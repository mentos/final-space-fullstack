import Image from "next/image";

type Props = {
  src: string;
  title: string;
};

const CharacterImage: React.FC<Props> = ({ src, title }) => (
  <div className="aspect-square relative border border-black">
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
);

export default CharacterImage;
