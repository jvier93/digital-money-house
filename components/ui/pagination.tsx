import React, { useMemo } from "react";
import Button from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  //Memorize page numbers to avoid recalculating on each render
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          variant={pageNumber === currentPage ? "primary" : "outline"}
          size="sm"
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
}
