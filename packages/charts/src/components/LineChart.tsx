import { useRef } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { useChartResize } from '../hooks/useChartResize';
import { drawText, drawHorizontalGrid, clearCanvas } from '../utils/canvasUtils';
import { getMinMax, valueToY, indexToX } from '../utils/chartUtils';

export interface LineChartProps {
  data: number[];
  color?: string;
  lineWidth?: number;
  showGrid?: boolean;
  gridColor?: string;
  yAxisSteps?: number;
}

export function LineChart({
  data,
  color = '#00d4ff',
  lineWidth = 2,
  showGrid = true,
  gridColor = '#f3f4f6',
  yAxisSteps = 5,
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useChartResize(containerRef);

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (data.length === 0 || width === 0 || height === 0) return;

    clearCanvas(ctx, width, height);

    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Get min/max values
    const { min, max } = getMinMax(data);
    const range = max - min || 1;

    // Draw grid and Y-axis labels
    if (showGrid) {
      for (let i = 0; i <= yAxisSteps; i++) {
        const value = min + (range * i) / yAxisSteps;
        const y = padding.top + chartHeight - (chartHeight * i) / yAxisSteps;

        // Grid line
        drawHorizontalGrid(ctx, y, width - padding.right, gridColor, 0.5);

        // Y-axis label
        drawText(ctx, value.toFixed(0), padding.left - 10, y, {
          color: '#6b7280',
          font: '11px monospace',
          align: 'right',
          baseline: 'middle',
        });
      }
    }

    // Draw line chart
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    data.forEach((value, index) => {
      const x = padding.left + indexToX(index, data.length, chartWidth);
      const y = padding.top + valueToY(value, min, max, chartHeight);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    data.forEach((value, index) => {
      const x = padding.left + indexToX(index, data.length, chartWidth);
      const y = padding.top + valueToY(value, min, max, chartHeight);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  };

  const canvasRef = useCanvas({ width, height, draw });

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );
}
