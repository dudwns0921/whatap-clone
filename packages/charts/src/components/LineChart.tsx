import { useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCanvas } from '../hooks/useCanvas';
import { useChartResize } from '../hooks/useChartResize';
import { drawText, clearCanvas } from '../utils/canvasUtils';
import { getMinMax, valueToY, indexToX } from '../utils/chartUtils';

export interface LineChartDataPoint {
  value: number;
  timestamp: string; // ISO 8601 format
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  color?: string;
  lineWidth?: number;
  showGrid?: boolean;
  gridColor?: string;
  yAxisSteps?: number;
}

export function LineChart({
  data,
  color = '#3b82f6',
  lineWidth = 1.5,
  showGrid = true,
  gridColor = '#e5e7eb',
  yAxisSteps = 5,
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useChartResize(containerRef);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const padding = { top: 20, right: 20, bottom: 40, left: 35 };

  // 시간 포맷팅 함수
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // 전체 날짜/시간 포맷팅
  const formatFullDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 날짜 포맷팅 (툴팁용)
  const formatDateLabel = (timestamp: string) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const today = new Date();
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    return `${month}/${day} (${isToday ? '오늘' : '어제'})`;
  };

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (data.length === 0 || width === 0 || height === 0) return;

      clearCanvas(ctx, width, height);

      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      const values = data.map(d => d.value);
      const { min, max } = getMinMax(values);
      const range = max - min || 1;

      // Draw Y-axis grid lines and labels
      if (showGrid) {
        for (let i = 0; i <= yAxisSteps; i++) {
          const value = min + (range * i) / yAxisSteps;
          const y = padding.top + chartHeight - (chartHeight * i) / yAxisSteps;

          // Grid line (dashed, only in chart area)
          ctx.beginPath();
          ctx.setLineDash([2, 3]);
          ctx.strokeStyle = '#f0f0f0';
          ctx.lineWidth = 0.5;
          ctx.moveTo(padding.left, y);
          ctx.lineTo(width - padding.right, y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Y-axis label (왼쪽에 붙이기)
          drawText(ctx, value.toFixed(0), 2, y, {
            color: '#9ca3af',
            font: '11px sans-serif',
            align: 'left',
            baseline: 'middle',
          });
        }
      }

      // Draw X-axis labels
      const xLabelCount = 4;
      for (let i = 0; i <= xLabelCount; i++) {
        const index = Math.floor((data.length - 1) * (i / xLabelCount));
        const x = padding.left + indexToX(index, data.length, chartWidth);
        const timeLabel = formatTime(data[index].timestamp);

        drawText(ctx, timeLabel, x, height - 20, {
          color: '#6b7280',
          font: '11px sans-serif',
          align: 'center',
          baseline: 'middle',
        });
      }

      // Draw line chart (no points)
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      data.forEach((point, index) => {
        const x = padding.left + indexToX(index, data.length, chartWidth);
        const y = padding.top + valueToY(point.value, min, max, chartHeight);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw hover effects
      if (hoveredIndex !== null && hoveredIndex < data.length) {
        const hoverX = padding.left + indexToX(hoveredIndex, data.length, chartWidth);
        const hoverY = padding.top + valueToY(data[hoveredIndex].value, min, max, chartHeight);

        // Vertical dashed line
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 1;
        ctx.moveTo(hoverX, padding.top);
        ctx.lineTo(hoverX, height - padding.bottom);
        ctx.stroke();
        ctx.setLineDash([]);

        // Blue dot at hover point
        ctx.beginPath();
        ctx.arc(hoverX, hoverY, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    [data, width, height, color, lineWidth, showGrid, gridColor, yAxisSteps, hoveredIndex]
  );

  const canvasRef = useCanvas({ width, height, draw });

  // Mouse move handler
  // CSS 변수 읽기 함수
  const getCSSVariable = (variable: string): string => {
    if (typeof window === 'undefined') return '';
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue(variable).trim();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (data.length === 0 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const chartWidth = width - padding.left - padding.right;

    // Find closest data point
    if (
      mouseX >= padding.left &&
      mouseX <= width - padding.right &&
      mouseY >= padding.top &&
      mouseY <= height - padding.bottom
    ) {
      const relativeX = mouseX - padding.left;
      const index = Math.round((relativeX / chartWidth) * (data.length - 1));
      setHoveredIndex(Math.max(0, Math.min(data.length - 1, index)));
      // Absolute position for portal tooltip
      setTooltipPos({
        x: rect.left + mouseX + 10,
        y: rect.top + mouseY - 50,
      });
    } else {
      setHoveredIndex(null);
      setTooltipPos(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
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

      {/* Tooltip via Portal - 완전히 분리하여 ResizeObserver 영향 방지 */}
      {hoveredIndex !== null &&
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
              {formatFullDateTime(data[hoveredIndex].timestamp)}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: getCSSVariable('--color-text-secondary') || '#d1d5db',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: color,
                }}
              />
              {formatDateLabel(data[hoveredIndex].timestamp)} : {data[hoveredIndex].value}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
