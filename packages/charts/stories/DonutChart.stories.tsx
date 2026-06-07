import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart, DonutChartData } from '../src';

const meta = {
  title: 'Charts/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    normalColor: { control: 'color' },
    slowColor: { control: 'color' },
    verySlowColor: { control: 'color' },
    showLegend: { control: 'boolean' },
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock 데이터 생성 함수
const generateActiveData = (normal: number, slow: number, verySlow: number): DonutChartData => ({
  normal,
  slow,
  verySlow,
});

// Default: 일반적인 액티브 트랜잭션 상태
export const Default: Story = {
  args: {
    data: generateActiveData(45, 12, 3),
    normalColor: '#3b82f6',
    slowColor: '#f59e0b',
    verySlowColor: '#ef4444',
    showLegend: true,
  },
};

// Empty: 액티브 트랜잭션 없음
export const Empty: Story = {
  args: {
    data: generateActiveData(0, 0, 0),
    normalColor: '#3b82f6',
    slowColor: '#f59e0b',
    verySlowColor: '#ef4444',
    showLegend: true,
  },
};

// HighLoad: 높은 부하 상태 (많은 Very Slow)
export const HighLoad: Story = {
  args: {
    data: generateActiveData(20, 35, 45), // Very Slow가 가장 많음
    normalColor: '#3b82f6',
    slowColor: '#f59e0b',
    verySlowColor: '#ef4444',
    showLegend: true,
  },
};

// Healthy: 건강한 상태 (대부분 Normal)
export const Healthy: Story = {
  args: {
    data: generateActiveData(95, 3, 2), // Normal이 압도적
    normalColor: '#3b82f6',
    slowColor: '#f59e0b',
    verySlowColor: '#ef4444',
    showLegend: true,
  },
};

// SingleSegment: 한 가지 상태만 있음
export const SingleSegment: Story = {
  args: {
    data: generateActiveData(0, 0, 10), // Very Slow만
    normalColor: '#3b82f6',
    slowColor: '#f59e0b',
    verySlowColor: '#ef4444',
    showLegend: true,
  },
};

// NoLegend: 범례 없음
export const NoLegend: Story = {
  args: {
    data: generateActiveData(30, 15, 5),
    normalColor: '#3b82f6',
    slowColor: '#f59e0b',
    verySlowColor: '#ef4444',
    showLegend: false,
  },
};
