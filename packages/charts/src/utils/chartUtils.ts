/**
 * 차트 계산 유틸리티 함수들
 */

/**
 * 값을 범위에 맞게 스케일링
 * @param value - 원본 값
 * @param min - 최소값
 * @param max - 최대값
 * @param rangeMin - 변환 후 최소값
 * @param rangeMax - 변환 후 최대값
 */
export function scaleValue(
  value: number,
  min: number,
  max: number,
  rangeMin: number,
  rangeMax: number
): number {
  if (max === min) return rangeMin;
  return ((value - min) / (max - min)) * (rangeMax - rangeMin) + rangeMin;
}

/**
 * 데이터 배열에서 최소/최대값 찾기
 */
export function getMinMax(data: number[]): { min: number; max: number } {
  if (data.length === 0) return { min: 0, max: 0 };

  let min = data[0];
  let max = data[0];

  for (const value of data) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return { min, max };
}

/**
 * Y축 값을 Canvas Y 좌표로 변환 (Canvas는 위에서 아래로)
 */
export function valueToY(value: number, min: number, max: number, height: number): number {
  const scaled = scaleValue(value, min, max, 0, height);
  return height - scaled; // Canvas는 위에서 아래로 증가하므로 뒤집기
}

/**
 * 인덱스를 X 좌표로 변환
 */
export function indexToX(index: number, dataLength: number, width: number): number {
  if (dataLength <= 1) return width / 2;
  return (index / (dataLength - 1)) * width;
}
