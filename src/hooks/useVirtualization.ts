import { useState, useEffect, useRef, useMemo } from 'react';

interface VirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualization<T>(
  items: T[],
  options: VirtualizationOptions
) {
  const { itemHeight, containerHeight, overscan = 3 } = options;
  
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { visibleItems, startIndex, endIndex, totalHeight, offsetY } = useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + visibleCount + overscan, items.length);
    const actualStart = Math.max(0, start - overscan);

    return {
      visibleItems: items.slice(actualStart, end),
      startIndex: actualStart,
      endIndex: end,
      totalHeight: items.length * itemHeight,
      offsetY: actualStart * itemHeight
    };
  }, [items, scrollTop, itemHeight, containerHeight, overscan]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      
      if (Math.abs(currentScrollTop - lastScrollTop) > itemHeight / 2) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setScrollTop(currentScrollTop);
          lastScrollTop = currentScrollTop;
        });
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [itemHeight]);

  return {
    containerRef,
    visibleItems,
    startIndex,
    endIndex,
    totalHeight,
    offsetY
  };
}
