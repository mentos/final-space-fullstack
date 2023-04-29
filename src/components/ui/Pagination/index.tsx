import { PropsWithChildren } from "react";
import ReactPaginate from "react-paginate";

const NavArrow: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
      {children}
    </span>
  );
};

type Props = {
  className?: string;
  currentPage: number;
  onPageChange: (selected: number) => void;
  pageRangeDisplayed?: number;
  totalPages: number;
};

const Pagination: React.FC<Props> = ({
  className,
  currentPage,
  onPageChange,
  pageRangeDisplayed = 2,
  totalPages,
}) => {
  const showNextButton = currentPage < totalPages;
  const showPrevButton = currentPage > 1;

  return (
    <ReactPaginate
      activeClassName="bg-slate-900 text-white"
      breakLabel={<span className="mr-4">...</span>}
      containerClassName={className}
      disableInitialCallback
      forcePage={currentPage - 1}
      nextLabel={showNextButton && <NavArrow>▶</NavArrow>}
      onPageChange={({ selected }) => onPageChange(selected)}
      pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
      pageCount={totalPages}
      pageRangeDisplayed={pageRangeDisplayed}
      previousLabel={showPrevButton && <NavArrow>◀</NavArrow>}
    />
  );
};

export default Pagination;
