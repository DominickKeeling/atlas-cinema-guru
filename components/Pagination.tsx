"use client";

import { useState, FC } from "react";

type PaginationProps = {
  onPageChange: (newPage: number) => void;
};

const Pagination: FC<PaginationProps> = ({ onPageChange }) => {
  const [page, setPage] = useState<number>(1);

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="flex mt-10 justify-center items-center gap-1">
      <button
        onClick={handlePrev}
        className="w-25 px-4 py-2 border rounded-l-3xl border-guru-dark-teal text-guru-navy bg-guru-teal disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="w-25 px-4 py-2 border bg-guru-teal text-guru-navy border-guru-dark-teal rounded-r-3xl"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;