// @elio-charts
// Tailwind CSS v4 기반 Canvas 차트 라이브러리

export const version = '0.0.1';

// Components
export { LineChart } from './components/LineChart';
export type { LineChartProps, LineChartDataPoint } from './components/LineChart';
export { HeatmapChart } from './components/HeatmapChart';
export type { HeatmapChartProps, HeatmapDataPoint } from './components/HeatmapChart';

// Hooks
export { useCanvas } from './hooks/useCanvas';
export { useChartResize } from './hooks/useChartResize';

// Utils
export * from './utils/canvasUtils';
export * from './utils/chartUtils';
