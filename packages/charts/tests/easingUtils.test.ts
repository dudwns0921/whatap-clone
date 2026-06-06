import { describe, expect, test } from 'vitest';
import { easeOutQuad } from '../src/utils/easingUtils';

describe('easeOutQuad', () => {
  test('t=0 이면 0 반환', () => {
    expect(easeOutQuad(0)).toBe(0);
  });

  test('t=1 이면 1 반환', () => {
    expect(easeOutQuad(1)).toBe(1);
  });

  test('t=0.5 이면 0.75 반환 (감속 곡선)', () => {
    expect(easeOutQuad(0.5)).toBe(0.75);
  });

  test('출력값은 항상 0과 1 사이', () => {
    const inputs = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
    inputs.forEach(t => {
      const result = easeOutQuad(t);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });
  });

  test('단조 증가 (이전 값보다 크거나 같음)', () => {
    let prev = 0;
    for (let t = 0; t <= 1; t += 0.1) {
      const current = easeOutQuad(t);
      expect(current).toBeGreaterThanOrEqual(prev - 1e-10);
      prev = current;
    }
  });
});
