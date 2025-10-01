import { useState, useMemo } from 'react';

interface PaginationOptions {
  pageSize?: number;
  initialPage?: number;
}

export function usePagination<T>(
  data: T[],
  options: PaginationOptions = {}
) {
  const { pageSize = 50, initialPage = 1 } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const previousPage = () => goToPage(currentPage - 1);
  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    pageSize,
    totalItems: data.length,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage
  };
}
