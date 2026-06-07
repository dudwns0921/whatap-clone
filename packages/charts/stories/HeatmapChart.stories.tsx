import type { Meta, StoryObj } from '@storybook/react';
import { HeatmapChart, HeatmapDataPoint } from '../src/components/HeatmapChart';

const meta = {
  title: 'Charts/HeatmapChart',
  component: HeatmapChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate timestamp helper
const generateTimestamp = (minutesAgo: number, secondsOffset: number = 0) => {
  const now = new Date();
  const date = new Date(now.getTime() - minutesAgo * 60000 - secondsOffset * 1000);
  return date.toISOString();
};

// Generate heatmap data - 개별 트랜잭션들
const generateHeatmapData = (): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const now = Date.now();

  // 5분간 300개의 트랜잭션 생성
  for (let i = 0; i < 300; i++) {
    const secondsAgo = Math.random() * 300; // 0-5분 사이 랜덤
    const responseTime = Math.random() * 5000; // 대부분 0-5초
    const isError = Math.random() < 0.05; // 5% 에러

    data.push({
      timestamp: new Date(now - secondsAgo * 1000).toISOString(),
      responseTime,
      isError,
    });
  }

  return data;
};

// Clustered data - 특정 시간대에 몰림 (horizontal pattern)
const generateClusteredData = (): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const now = Date.now();

  // 특정 시간대 (2분 전 ~ 1.5분 전)에 트랜잭션 집중
  for (let i = 0; i < 500; i++) {
    const secondsAgo = 90 + Math.random() * 30; // 1.5~2분 사이
    const responseTime = Math.random() * 10000; // 0-10초
    const isError = Math.random() < 0.1; // 10% 에러

    data.push({
      timestamp: new Date(now - secondsAgo * 1000).toISOString(),
      responseTime,
      isError,
    });
  }

  // 나머지 시간대에도 약간
  for (let i = 0; i < 100; i++) {
    const secondsAgo = Math.random() * 300;
    const responseTime = Math.random() * 5000;
    const isError = Math.random() < 0.05;

    data.push({
      timestamp: new Date(now - secondsAgo * 1000).toISOString(),
      responseTime,
      isError,
    });
  }

  return data;
};

// Slow responses - 세로 패턴 (vertical pattern)
const generateSlowData = (): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const now = Date.now();

  // 대부분 느린 응답 (30-80초)
  for (let i = 0; i < 400; i++) {
    const secondsAgo = Math.random() * 300;
    const responseTime = 30000 + Math.random() * 50000; // 30-80초
    const isError = Math.random() < 0.15; // 15% 에러

    data.push({
      timestamp: new Date(now - secondsAgo * 1000).toISOString(),
      responseTime,
      isError,
    });
  }

  return data;
};

export const Default: Story = {
  args: {
    data: generateHeatmapData(),
    normalColor: '#3b82f6',
    errorColor: '#ef4444',
    maxResponseTime: 80,
    timeRangeSec: 300,
    showGrid: true,
  },
};

export const HorizontalPattern: Story = {
  args: {
    data: generateClusteredData(),
    normalColor: '#10b981',
    errorColor: '#f97316',
    maxResponseTime: 80,
    timeRangeSec: 300,
    showGrid: true,
  },
};

export const VerticalPattern: Story = {
  args: {
    data: generateSlowData(),
    normalColor: '#a855f7',
    errorColor: '#dc2626',
    maxResponseTime: 80,
    timeRangeSec: 300,
    showGrid: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    normalColor: '#3b82f6',
    errorColor: '#ef4444',
    maxResponseTime: 80,
    timeRangeSec: 300,
    showGrid: true,
  },
};
