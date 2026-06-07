import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '../src/components/LineChart';

const meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// TPS 데이터 (Transaction Per Second)
const tpsData = [
  45, 52, 48, 55, 61, 58, 63, 70, 75, 82, 78, 85, 92, 88, 95, 102, 98, 105, 112, 108, 115, 122,
  118, 125, 132, 128, 135, 142, 138, 145,
];

// 스파이크가 있는 데이터
const spikeData = [
  30, 32, 35, 33, 38, 40, 42, 45, 120, 150, 140, 50, 48, 45, 42, 40, 38, 35, 33, 30, 28, 30, 32,
  35, 33, 38, 40, 42, 45, 43,
];

// 평탄한 데이터
const flatData = Array.from({ length: 30 }, () => 50 + Math.random() * 10);

// 비어있는 데이터
const emptyData: number[] = [];

export const Default: Story = {
  args: {
    data: tpsData,
    color: '#00d4ff',
    lineWidth: 2,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const WithSpike: Story = {
  args: {
    data: spikeData,
    color: '#00ff88',
    lineWidth: 2,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const FlatData: Story = {
  args: {
    data: flatData,
    color: '#ffb800',
    lineWidth: 2,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const NoGrid: Story = {
  args: {
    data: tpsData,
    color: '#00d4ff',
    lineWidth: 2,
    showGrid: false,
  },
};

export const ThickLine: Story = {
  args: {
    data: tpsData,
    color: '#00d4ff',
    lineWidth: 4,
    showGrid: true,
    yAxisSteps: 5,
  },
};

export const Empty: Story = {
  args: {
    data: emptyData,
    color: '#00d4ff',
    lineWidth: 2,
    showGrid: true,
    yAxisSteps: 5,
  },
};
