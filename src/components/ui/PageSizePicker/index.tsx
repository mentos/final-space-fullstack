type Props = {
  onClick: (size: number) => void;
  sizes: number[];
  activeSize: number;
};

const PageSizePicker: React.FC<Props> = ({ activeSize, onClick, sizes }) => {
  return (
    <div className="flex flex-row content-center items-center justify-center">
      <span className="inline-block font-medium text-sm mr-4">Per page:</span>
      {sizes.map((n) => (
        <button
          key={`per-page-picker-${n}`}
          className={`block border- border-solid border-lightGray hover:bg-lightGray w-6 h-6 items-center rounded-md mr-4 text-sm ${
            activeSize === n ? "bg-slate-900 text-white" : ""
          }`}
          onClick={() => onClick(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
};

export default PageSizePicker;
