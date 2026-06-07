import { useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCanvas } from '../hooks/useCanvas';
import { useChartResize } from '../hooks/useChartResize';
import { clearCanvas } from '../utils/canvasUtils';

export interface DonutChartData {
  normal: number; // 정상 응답 시간 트랜잭션 수
  slow: number; // 느린 트랜잭션 수 (~8초)
  verySlow: number; // 매우 느린 트랜잭션 수 (2배 이상)
}

export interface DonutChartProps {
  data: DonutChartData;
  normalColor?: string; // 정상 색상 (default: blue)
  slowColor?: string; // 느림 색상 (default: orange)
  verySlowColor?: string; // 매우 느림 색상 (default: red)
  showLegend?: boolean; // 범례 표시 여부
}

interface SegmentInfo {
  type: 'normal' | 'slow' | 'verySlow';
  label: string;
  color: string;
  value: number;
}

export function DonutChart({
  data,
  normalColor = '#3b82f6', // Blue
  slowColor = '#f59e0b', // Orange
  verySlowColor = '#ef4444', // Red
  showLegend = true,
}: DonutChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useChartResize(containerRef);

  const [hoveredSegment, setHoveredSegment] = useState<SegmentInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const total = data.normal + data.slow + data.verySlow;

  // CSS variable reader
  const getCSSVariable = (variable: string): string => {
    if (typeof window === 'undefined') return '';
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue(variable).trim();
  };

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (width === 0 || height === 0) return;

      clearCanvas(ctx, width, height);

      const centerX = width / 2;
      const centerY = showLegend ? height / 2 - 10 : height / 2; // 범례 있으면 위로 이동
      const radius = Math.min(width, height) / 2 - 40;
      const innerRadius = radius * 0.65; // 도넛 내부 반지름 (얇은 링)

      if (total === 0) {
        // 데이터 없을 때 회색 원
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = '#374151';
        ctx.fill();

        // 중앙 텍스트
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = getCSSVariable('--color-text-primary') || '#f9fafb';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('0', centerX, centerY);

        ctx.font = '12px sans-serif';
        ctx.fillStyle = getCSSVariable('--color-text-secondary') || '#9ca3af';
        ctx.fillText('Active', centerX, centerY - 20);

        return;
      }

      // 세그먼트 그리기
      let currentAngle = -Math.PI / 2; // 12시 방향부터 시작

      // Very Slow (빨간색)
      if (data.verySlow > 0) {
        const angle = (data.verySlow / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + angle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = verySlowColor;
        ctx.fill();
        currentAngle += angle;
      }

      // Slow (주황색)
      if (data.slow > 0) {
        const angle = (data.slow / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + angle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = slowColor;
        ctx.fill();
        currentAngle += angle;
      }

      // Normal (파란색)
      if (data.normal > 0) {
        const angle = (data.normal / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + angle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = normalColor;
        ctx.fill();
      }

      // 중앙 텍스트 - Active 개수
      ctx.font = '12px sans-serif';
      ctx.fillStyle = getCSSVariable('--color-text-secondary') || '#9ca3af';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Active', centerX, centerY - 15);

      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = getCSSVariable('--color-text-primary') || '#f9fafb';
      ctx.fillText(total.toString(), centerX, centerY + 8);

      // 범례 그리기
      if (showLegend) {
        const legendY = height - 20;
        const legendItems = [
          { label: 'Very Slow', color: verySlowColor },
          { label: 'Slow', color: slowColor },
          { label: 'Normal', color: normalColor },
        ];

        const totalWidth = legendItems.reduce((acc, item) => {
          ctx.font = '11px sans-serif';
          return acc + ctx.measureText(item.label).width + 20; // 20 = 색상박스(10) + 간격(10)
        }, 0);

        let currentX = centerX - totalWidth / 2;

        legendItems.forEach((item) => {
          // 색상 박스
          ctx.fillStyle = item.color;
          ctx.fillRect(currentX, legendY - 5, 10, 10);

          // 텍스트
          ctx.font = '11px sans-serif';
          ctx.fillStyle = getCSSVariable('--color-text-tertiary') || '#9ca3af';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.label, currentX + 15, legendY);

          currentX += ctx.measureText(item.label).width + 30;
        });
      }
    },
    [data, width, height, normalColor, slowColor, verySlowColor, showLegend, total]
  );

  const canvasRef = useCanvas({ width, height, draw });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || total === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = width / 2;
    const centerY = showLegend ? height / 2 - 10 : height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    const innerRadius = radius * 0.65;

    // 마우스와 중심 사이의 거리
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 도넛 링 영역 내부인지 확인
    if (distance >= innerRadius && distance <= radius) {
      // 각도 계산 (12시 방향 = -90도)
      let angle = Math.atan2(dy, dx);
      angle = angle + Math.PI / 2; // 12시 방향을 0으로 조정
      if (angle < 0) angle += Math.PI * 2;

      // 현재 각도에 해당하는 세그먼트 찾기
      let currentAngle = 0;

      // Very Slow
      const verySlowAngle = (data.verySlow / total) * Math.PI * 2;
      if (angle >= currentAngle && angle < currentAngle + verySlowAngle) {
        setHoveredSegment({
          type: 'verySlow',
          label: 'Very Slow',
          color: verySlowColor,
          value: data.verySlow,
        });
        setTooltipPos({ x: e.clientX + 10, y: e.clientY - 30 });
        return;
      }
      currentAngle += verySlowAngle;

      // Slow
      const slowAngle = (data.slow / total) * Math.PI * 2;
      if (angle >= currentAngle && angle < currentAngle + slowAngle) {
        setHoveredSegment({
          type: 'slow',
          label: 'Slow',
          color: slowColor,
          value: data.slow,
        });
        setTooltipPos({ x: e.clientX + 10, y: e.clientY - 30 });
        return;
      }
      currentAngle += slowAngle;

      // Normal
      setHoveredSegment({
        type: 'normal',
        label: 'Normal',
        color: normalColor,
        value: data.normal,
      });
      setTooltipPos({ x: e.clientX + 10, y: e.clientY - 30 });
    } else {
      setHoveredSegment(null);
      setTooltipPos(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setTooltipPos(null);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-full relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>

      {/* Tooltip via Portal */}
      {hoveredSegment &&
        tooltipPos &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              left: tooltipPos.x,
              top: tooltipPos.y,
              zIndex: 1000,
              whiteSpace: 'nowrap',
              backgroundColor: getCSSVariable('--color-surface-secondary') || '#1f2937',
              border: `1px solid ${getCSSVariable('--color-border-default') || '#374151'}`,
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '0.5rem 0.75rem',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: hoveredSegment.color,
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}
            >
              {hoveredSegment.label}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: getCSSVariable('--color-text-secondary') || '#d1d5db',
              }}
            >
              Count: {hoveredSegment.value}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: getCSSVariable('--color-text-tertiary') || '#9ca3af',
              }}
            >
              {((hoveredSegment.value / total) * 100).toFixed(1)}%
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
