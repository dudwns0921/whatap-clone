import { useEffect, useState, RefObject } from 'react';

/**
 * ResizeObserver를 사용한 반응형 차트 훅
 * @param containerRef - 컨테이너 ref
 * @returns { width, height } - 컨테이너 크기
 */
export function useChartResize(containerRef: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);

    // 초기 크기 설정
    setSize({
      width: container.clientWidth,
      height: container.clientHeight,
    });

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return size;
}
