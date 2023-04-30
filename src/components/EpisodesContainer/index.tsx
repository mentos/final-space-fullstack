import { PropsWithChildren } from "react";
import { Spinner } from "../ui";

type Props = PropsWithChildren & {
  loading: boolean;
};

const EpisodesContainer: React.FC<Props> = ({ children, loading }) => {
  return (
    <div
      className={`flex flex-col items-center ${loading ? "opacity-30" : ""}`}
    >
      {loading && <Spinner style="overlay" />}
      {children}
    </div>
  );
};

export default EpisodesContainer;
