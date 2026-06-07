import type { Meta, StoryObj } from '@storybook/react';
import { LineChart, LineChartDataPoint } from '../src/components/LineChart';

const meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// 타임스탬프 생성 함수
const generateTimestamp = (hoursAgo: number, minutesOffset: number = 0) => {
  const now = new Date();
  const date = new Date(now.getTime() - hoursAgo * 3600000 - minutesOffset * 60000);
  return date.toISOString();
};

// TPS 데이터 (Transaction Per Second)
const tpsData: LineChartDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const minutesAgo = 59 - i;
  const baseValue = 80;
  const variation = Math.sin(i / 10) * 20;
  const noise = Math.random() * 10 - 5;
  const value = Math.max(0, Math.floor(baseValue + variation + noise));

  return {
    value,
    timestamp: generateTimestamp(0, minutesAgo),
  };
});

// 스파이크가 있는 데이터
const spikeData: LineChartDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const minutesAgo = 59 - i;
  const baseValue = 50;
  const spike = i === 30 ? 100 : 0;
  const noise = Math.random() * 5;
  const value = Math.max(0, Math.floor(baseValue + spike + noise));

  return {
    value,
    timestamp: generateTimestamp(0, minutesAgo),
  };
});

// 평탄한 데이터
const flatData: LineChartDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const minutesAgo = 59 - i;
  const value = Math.floor(50 + Math.random() * 10);

  return {
    value,
    timestamp: generateTimestamp(0, minutesAgo),
  };
});

// 비어있는 데이터
const emptyData: LineChartDataPoint[] = [];

export const Default: Story = {
  args: {
    data: tpsData,
    color: '#3b82f6',
    lineWidth: 1.5,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const WithSpike: Story = {
  args: {
    data: spikeData,
    color: '#10b981',
    lineWidth: 1.5,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const FlatData: Story = {
  args: {
    data: flatData,
    color: '#f59e0b',
    lineWidth: 1.5,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const NoGrid: Story = {
  args: {
    data: tpsData,
    color: '#3b82f6',
    lineWidth: 1.5,
    showGrid: false,
  },
};

export const ThickLine: Story = {
  args: {
    data: tpsData,
    color: '#3b82f6',
    lineWidth: 3,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const Empty: Story = {
  args: {
    data: emptyData,
    color: '#3b82f6',
    lineWidth: 1.5,
    showGrid: true,
    yAxisSteps: 5,
  },
};
