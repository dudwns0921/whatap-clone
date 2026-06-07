import { useRef, useEffect } from 'react';

interface UseCanvasOptions {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
}

/**
 * Canvas 기본 훅
 * - devicePixelRatio 처리
 * - Canvas 초기화
 * - 그리기 함수 실행
 */
export function useCanvas({ width, height, draw }: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // devicePixelRatio 처리 (레티나 대응)
    const dpr = window.devicePixelRatio || 1;

    // Canvas 내부 해상도 설정
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Canvas CSS 크기를 명시적으로 설정 (레이아웃 영향 방지)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // 그리기 실행
    draw(ctx, canvas);
  }, [width, height, draw]);

  return canvasRef;
}
