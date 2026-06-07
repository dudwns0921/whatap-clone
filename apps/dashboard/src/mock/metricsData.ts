/**
 * Mock 데이터 - 실시간 모니터링 메트릭스
 */

import { LineChartDataPoint } from 'elio-charts';

// 현재 시간 기준으로 과거 60분 데이터 생성
const now = new Date();
const generateTimestamp = (minutesAgo: number) => {
  const date = new Date(now.getTime() - minutesAgo * 60000);
  return date.toISOString();
};

// TPS (Transaction Per Second) 데이터
export const tpsData: LineChartDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const minutesAgo = 59 - i;
  const baseValue = 80;
  const variation = Math.sin(i / 10) * 20;
  const noise = Math.random() * 10 - 5;
  const spike = i === 30 ? 50 : 0;
  const value = Math.max(0, Math.floor(baseValue + variation + noise + spike));

  return {
    value,
    timestamp: generateTimestamp(minutesAgo),
  };
});

// CPU 사용률 데이터 (0-100%)
export const cpuData: LineChartDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const minutesAgo = 59 - i;
  const baseValue = 40;
  const variation = Math.sin(i / 8) * 15;
  const noise = Math.random() * 5;
  const value = Math.min(100, Math.max(0, Math.floor(baseValue + variation + noise)));

  return {
    value,
    timestamp: generateTimestamp(minutesAgo),
  };
});

// 메모리 사용률 데이터 (MB)
export const memoryData: LineChartDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const minutesAgo = 59 - i;
  const baseValue = 512;
  const trend = i * 2;
  const noise = Math.random() * 20 - 10;
  const value = Math.max(0, Math.floor(baseValue + trend + noise));

  return {
    value,
    timestamp: generateTimestamp(minutesAgo),
  };
});
