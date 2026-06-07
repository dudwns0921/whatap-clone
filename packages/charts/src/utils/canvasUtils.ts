/**
 * Canvas 유틸리티 함수들
 */

/**
 * 선 그리기
 */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

/**
 * 텍스트 그리기
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    color?: string;
    font?: string;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
  } = {}
) {
  const { color = '#6b7280', font = '10px sans-serif', align = 'left', baseline = 'top' } = options;

  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
}

/**
 * 수평 그리드 라인 그리기
 */
export function drawHorizontalGrid(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  color = '#f3f4f6',
  lineWidth = 0.5
) {
  drawLine(ctx, 0, y, width, y, color, lineWidth);
}

/**
 * 수직 그리드 라인 그리기
 */
export function drawVerticalGrid(
  ctx: CanvasRenderingContext2D,
  x: number,
  height: number,
  color = '#f3f4f6',
  lineWidth = 0.5
) {
  drawLine(ctx, x, 0, x, height, color, lineWidth);
}

/**
 * 사각형 그리기
 */
export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

/**
 * Canvas 초기화 (전체 지우기)
 */
export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
}
