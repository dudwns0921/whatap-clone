import { describe, expect, test } from 'vitest';
import {
  CHART_PADDING,
  canvasXToDataIndex,
  clamp,
  dataToCanvasX,
  dataToCanvasY,
  getChartBounds,
  getDatasetValueRange,
  getVisibleRange,
} from '../src/utils/chartMath';
import type { ChartData } from '../src/types/chartTypes';

describe('clamp', () => {
  test('범위 내 값은 그대로 반환', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test('최솟값보다 작으면 최솟값 반환', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test('최댓값보다 크면 최댓값 반환', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test('경계값은 그대로 반환', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe('getChartBounds', () => {
  test('올바른 padding과 chartWidth/chartHeight 계산', () => {
    const bounds = getChartBounds(500, 400);
    expect(bounds.padding).toBe(CHART_PADDING);
    expect(bounds.chartWidth).toBe(500 - CHART_PADDING * 2);
    expect(bounds.chartHeight).toBe(400 - CHART_PADDING * 2);
  });

  test('정사각형 컨테이너', () => {
    const bounds = getChartBounds(300, 300);
    expect(bounds.chartWidth).toBe(bounds.chartHeight);
  });
});

describe('getVisibleRange', () => {
  test('scale=1, offsetX=0 이면 전체 범위 반환', () => {
    const range = getVisibleRange(100, { scale: 1, offsetX: 0 });
    expect(range.startIndex).toBe(0);
    expect(range.endIndex).toBe(100);
    expect(range.visibleCount).toBe(100);
  });

  test('scale=2 이면 절반만 표시', () => {
    const range = getVisibleRange(100, { scale: 2, offsetX: 0 });
    expect(range.visibleCount).toBeLessThanOrEqual(50);
  });

  test('offsetX로 시작 인덱스 이동', () => {
    const range = getVisibleRange(100, { scale: 2, offsetX: 10 });
    expect(range.startIndex).toBe(10);
  });

  test('endIndex는 totalPoints를 초과하지 않음', () => {
    const range = getVisibleRange(50, { scale: 1, offsetX: 30 });
    expect(range.endIndex).toBeLessThanOrEqual(50);
  });

  test('visibleCount는 최소 2 이상', () => {
    const range = getVisibleRange(5, { scale: 10, offsetX: 0 });
    expect(range.visibleCount).toBeGreaterThanOrEqual(2);
  });
});

describe('dataToCanvasX', () => {
  test('첫 번째 포인트는 padding 위치', () => {
    const x = dataToCanvasX(0, 0, 10, 400, 40);
    expect(x).toBe(40);
  });

  test('마지막 포인트는 padding + chartWidth 위치', () => {
    const x = dataToCanvasX(9, 0, 10, 400, 40);
    expect(x).toBe(440);
  });

  test('중간 포인트는 선형 보간', () => {
    // 10개 포인트, chartWidth=400, padding=40
    // index 5 → 40 + (5/9) * 400 ≈ 262.2
    const x = dataToCanvasX(5, 0, 10, 400, 40);
    expect(x).toBeCloseTo(40 + (5 / 9) * 400, 1);
  });

  test('offsetX가 있을 때 올바른 위치', () => {
    // startIndex=10, 10개 표시, index=10 → 시작 위치
    const x = dataToCanvasX(10, 10, 10, 400, 40);
    expect(x).toBe(40);
  });
});

describe('dataToCanvasY', () => {
  test('최솟값은 차트 하단 (padding + chartHeight)', () => {
    const y = dataToCanvasY(0, 0, 100, 300, 40);
    expect(y).toBe(340); // 40 + 300
  });

  test('최댓값은 차트 상단 (padding)', () => {
    const y = dataToCanvasY(100, 0, 100, 300, 40);
    expect(y).toBe(40);
  });

  test('중간값은 선형 보간', () => {
    const y = dataToCanvasY(50, 0, 100, 300, 40);
    expect(y).toBeCloseTo(190, 1); // 40 + 300 - 150
  });
});

describe('canvasXToDataIndex', () => {
  test('차트 시작 위치 → 첫 번째 인덱스', () => {
    const index = canvasXToDataIndex(40, 0, 10, 400, 40, 10);
    expect(index).toBe(0);
  });

  test('차트 끝 위치 → 마지막 인덱스', () => {
    const index = canvasXToDataIndex(440, 0, 10, 400, 40, 10);
    expect(index).toBe(9);
  });

  test('범위 밖 마우스 위치는 clamp됨', () => {
    const index = canvasXToDataIndex(-100, 0, 10, 400, 40, 10);
    expect(index).toBe(0);
  });

  test('totalPoints를 초과하지 않음', () => {
    const index = canvasXToDataIndex(1000, 0, 10, 400, 40, 10);
    expect(index).toBeLessThanOrEqual(9);
  });
});

describe('getDatasetValueRange', () => {
  const dataset: ChartData = {
    label: 'test',
    data: [
      { time: 1, value: 10 },
      { time: 2, value: 50 },
      { time: 3, value: 30 },
      { time: 4, value: 80 },
      { time: 5, value: 20 },
    ],
  };

  test('전체 범위의 min/max 계산', () => {
    const { minValue, maxValue } = getDatasetValueRange(dataset, 0, 5);
    expect(minValue).toBe(10);
    expect(maxValue).toBe(80);
  });

  test('슬라이스 범위의 min/max 계산', () => {
    const { minValue, maxValue } = getDatasetValueRange(dataset, 1, 3);
    expect(minValue).toBe(30);
    expect(maxValue).toBe(50);
  });

  test('단일 값이면 valueRange=1 (0 나누기 방지)', () => {
    const singleDataset: ChartData = {
      label: 'flat',
      data: [{ time: 1, value: 42 }],
    };
    const { valueRange } = getDatasetValueRange(singleDataset, 0, 1);
    expect(valueRange).toBe(1);
  });

  test('빈 슬라이스면 기본값 반환', () => {
    const { minValue, maxValue, valueRange } = getDatasetValueRange(dataset, 0, 0);
    expect(minValue).toBe(0);
    expect(maxValue).toBe(1);
    expect(valueRange).toBe(1);
  });
});
