import { useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCanvas } from '../hooks/useCanvas';
import { useChartResize } from '../hooks/useChartResize';
import { drawText, clearCanvas } from '../utils/canvasUtils';

export interface HeatmapDataPoint {
  timestamp: string; // ISO 8601 format - 트랜잭션 종료 시간
  responseTime: number; // milliseconds - 응답 시간
  isError?: boolean; // 에러 여부
}

export interface HeatmapChartProps {
  data: HeatmapDataPoint[];
  normalColor?: string; // 정상 트랜잭션 색상 (default: blue)
  errorColor?: string; // 에러 트랜잭션 색상 (default: red/orange)
  maxResponseTime?: number; // Maximum response time in seconds (default: 80)
  timeRangeSec?: number; // Time range to display in seconds (default: 300 = 5 min)
}

export function HeatmapChart({
  data,
  normalColor = '#3b82f6', // Blue for normal transactions
  errorColor = '#ef4444', // Red for errors
  maxResponseTime = 80, // 80 seconds
  timeRangeSec = 300, // 5 minutes
}: HeatmapChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useChartResize(containerRef);

  const [hoveredCell, setHoveredCell] = useState<HeatmapDataPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const padding = { top: 10, right: 10, bottom: 30, left: 40 };

  // Time formatting
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Get color based on error status
  const getColor = (isError: boolean): string => {
    return isError ? errorColor : normalColor;
  };

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

      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      // Y축 레이블 (위에서 아래로: 80s -> 0s)
      const yLabels = ['80s', '64s', '48s', '32s', '16s', '0s'];
      yLabels.forEach((label, i) => {
        const y = padding.top + (i * chartHeight) / 5;
        drawText(ctx, label, padding.left - 5, y, {
          color: '#9ca3af',
          font: '10px sans-serif',
          align: 'right',
          baseline: 'middle',
        });
      });

      // X축 레이블 (시간)
      if (data.length > 0) {
        for (let i = 0; i <= 5; i++) {
          const x = padding.left + (chartWidth * i) / 5;
          const timeIndex = Math.max(0, Math.floor((data.length - 1) * (i / 5)));
          if (data[timeIndex]) {
            const timeLabel = formatTime(data[timeIndex].timestamp);
            drawText(ctx, timeLabel, x, height - 10, {
              color: '#6b7280',
              font: '10px sans-serif',
              align: 'center',
              baseline: 'middle',
            });
          }
        }
      }

      if (data.length === 0) return;

      // 격자 구조 설정
      const cellWidth = 6; // 셀 너비 (픽셀)
      const cellHeight = 6; // 셀 높이 (픽셀)
      const cols = Math.floor(chartWidth / cellWidth); // 가로 셀 개수
      const rows = Math.floor(chartHeight / cellHeight); // 세로 셀 개수

      // 시간대별로 트랜잭션 그룹화
      const now = new Date();
      const startTime = now.getTime() - timeRangeSec * 1000;

      data.forEach((point) => {
        const pointTime = new Date(point.timestamp).getTime();
        const responseTimeSec = point.responseTime / 1000;

        // 범위 밖이면 무시
        if (pointTime < startTime || responseTimeSec > maxResponseTime) return;

        // X 위치: 시간을 그리드 셀 인덱스로 변환
        const timeDiff = pointTime - startTime;
        const timeRatio = timeDiff / (timeRangeSec * 1000);
        const colIndex = Math.floor(timeRatio * cols);

        // Y 위치: 응답시간을 그리드 셀 인덱스로 변환 (위에서 아래로 80s -> 0s)
        const responseRatio = responseTimeSec / maxResponseTime;
        const rowIndex = Math.floor((1 - responseRatio) * rows);

        // 그리드에 정렬된 위치 계산
        const x = padding.left + colIndex * cellWidth;
        const y = padding.top + rowIndex * cellHeight;

        // 사각형 그리기 (1px 간격을 위해 -1)
        ctx.fillStyle = getColor(point.isError || false);
        ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);
      });
    },
    [data, width, height, normalColor, errorColor, maxResponseTime, timeRangeSec]
  );

  const canvasRef = useCanvas({ width, height, draw });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (data.length === 0 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Check if mouse is in chart area
    if (
      mouseX >= padding.left &&
      mouseX <= width - padding.right &&
      mouseY >= padding.top &&
      mouseY <= height - padding.bottom
    ) {
      const now = new Date();
      const startTime = now.getTime() - timeRangeSec * 1000;

      const cellWidth = 6;
      const cellHeight = 6;
      const cols = Math.floor(chartWidth / cellWidth);
      const rows = Math.floor(chartHeight / cellHeight);

      // Find closest transaction (grid-aligned)
      const hoveredPoint = data.find((point) => {
        const pointTime = new Date(point.timestamp).getTime();
        const responseTimeSec = point.responseTime / 1000;

        if (pointTime < startTime || responseTimeSec > maxResponseTime) return false;

        const timeDiff = pointTime - startTime;
        const timeRatio = timeDiff / (timeRangeSec * 1000);
        const colIndex = Math.floor(timeRatio * cols);

        const responseRatio = responseTimeSec / maxResponseTime;
        const rowIndex = Math.floor((1 - responseRatio) * rows);

        const x = padding.left + colIndex * cellWidth;
        const y = padding.top + rowIndex * cellHeight;

        return (
          mouseX >= x &&
          mouseX < x + cellWidth &&
          mouseY >= y &&
          mouseY < y + cellHeight
        );
      });

      if (hoveredPoint) {
        setHoveredCell(hoveredPoint);
        setTooltipPos({
          x: rect.left + mouseX + 10,
          y: rect.top + mouseY - 50,
        });
      } else {
        setHoveredCell(null);
        setTooltipPos(null);
      }
    } else {
      setHoveredCell(null);
      setTooltipPos(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
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
      {hoveredCell &&
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
                color: getCSSVariable('--color-text-primary') || '#f9fafb',
                fontWeight: 500,
                marginBottom: '0.25rem',
              }}
            >
              {formatTime(hoveredCell.timestamp)}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: getCSSVariable('--color-text-secondary') || '#d1d5db',
              }}
            >
              Response: {hoveredCell.responseTime}ms
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: hoveredCell.isError ? '#ef4444' : '#10b981',
                fontWeight: 500,
              }}
            >
              {hoveredCell.isError ? 'Error' : 'Normal'}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
