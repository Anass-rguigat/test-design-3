import { useRef, useState, useEffect, useCallback } from 'react';

export function useWorkflowCarousel(itemCount, itemsPerPage = 3) {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(itemCount / itemsPerPage));
  const canScroll = itemCount > itemsPerPage;

  const updatePageFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !canScroll) return;
    const pageWidth = el.clientWidth;
    const newPage = Math.round(el.scrollLeft / pageWidth);
    setPage(Math.min(newPage, totalPages - 1));
  }, [canScroll, totalPages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    el.addEventListener('scroll', updatePageFromScroll, { passive: true });
    return () => el.removeEventListener('scroll', updatePageFromScroll);
  }, [updatePageFromScroll]);

  const scrollToPage = useCallback(
    (targetPage) => {
      const el = scrollRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(targetPage, totalPages - 1));
      el.scrollTo({ left: el.clientWidth * clamped, behavior: 'smooth' });
      setPage(clamped);
    },
    [totalPages]
  );

  const goNext = () => scrollToPage(page + 1);
  const goPrev = () => scrollToPage(page - 1);

  return {
    scrollRef,
    page,
    totalPages,
    canScroll,
    canGoPrev: page > 0,
    canGoNext: page < totalPages - 1,
    goNext,
    goPrev,
    scrollToPage,
  };
}
