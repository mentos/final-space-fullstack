import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  size: 1 | 2 | 3 | 4 | 5 | 6;
};

type HeadingVariant = {
  className?: string;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const HeadingVariant: { [size: number]: HeadingVariant } = {
  1: {
    tag: "h1",
    className:
      "bg-black text-3xl md:text-6xl text-white text-center font-bold py-8 px-4 md:mb-10",
  },
  2: {
    tag: "h2",
    className: "text-2xl md:text-3xl tracking-tighter font-light",
  },
  3: {
    tag: "h3",
    className:
      "text-sm md:hidden md:text-3xl uppercase font-medium tracking-wide mb-4 px-4",
  },
  4: {
    tag: "h4",
  },
  5: {
    tag: "h5",
  },
  6: {
    tag: "h6",
  },
};

const Heading: React.FC<Props> = ({ children, size }) => {
  const Tag = HeadingVariant[size]?.tag || "span";
  const className = HeadingVariant[size]?.className;

  return <Tag className={className}>{children}</Tag>;
};

export default Heading;
