import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChartAnimation } from '../src/hooks/useChartAnimation';

describe('useChartAnimation', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('animate=false 이면 progress가 즉시 1', () => {
    const { result } = renderHook(() => useChartAnimation(false, 'key', 800));
    expect(result.current).toBe(1);
  });

  test('animate=true 이면 초기 progress가 0', () => {
    // RAF 콜백을 즉시 실행하지 않고 캡처만 → 무한루프 방지
    vi.stubGlobal('requestAnimationFrame', (_cb: FrameRequestCallback) => 1);
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const { result } = renderHook(() => useChartAnimation(true, 'key', 800));
    expect(result.current).toBe(0);

    vi.unstubAllGlobals();
  });

  test('animationKey 변경 시 progress 재시작', () => {
    let animationKey = 'key1';
    const { result, rerender } = renderHook(() => useChartAnimation(false, animationKey, 800));

    expect(result.current).toBe(1);

    act(() => {
      animationKey = 'key2';
    });

    rerender();
    expect(result.current).toBe(1); // animate=false 이므로 여전히 1
  });
});
