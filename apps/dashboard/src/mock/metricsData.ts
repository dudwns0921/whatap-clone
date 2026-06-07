/**
 * Mock 데이터 - 실시간 모니터링 메트릭스
 */

// TPS (Transaction Per Second) 데이터
// 60개 데이터 포인트 (1분간 1초 간격)
export const tpsData = Array.from({ length: 60 }, (_, i) => {
  const baseValue = 80;
  const variation = Math.sin(i / 10) * 20; // 사인 파형
  const noise = Math.random() * 10 - 5; // 노이즈
  const spike = i === 30 ? 50 : 0; // 중간에 스파이크
  return Math.max(0, Math.floor(baseValue + variation + noise + spike));
});

// CPU 사용률 데이터 (0-100%)
export const cpuData = Array.from({ length: 60 }, (_, i) => {
  const baseValue = 40;
  const variation = Math.sin(i / 8) * 15;
  const noise = Math.random() * 5;
  return Math.min(100, Math.max(0, Math.floor(baseValue + variation + noise)));
});

// 메모리 사용률 데이터 (MB)
export const memoryData = Array.from({ length: 60 }, (_, i) => {
  const baseValue = 512;
  const trend = i * 2; // 점진적 증가
  const noise = Math.random() * 20 - 10;
  return Math.max(0, Math.floor(baseValue + trend + noise));
});

// Apdex 스코어 데이터 (0-1)
export const apdexData = Array.from({ length: 60 }, (_, i) => {
  const baseValue = 0.85;
  const variation = Math.sin(i / 12) * 0.1;
  const noise = Math.random() * 0.05 - 0.025;
  return Math.min(1, Math.max(0, baseValue + variation + noise));
});

// 활성 트랜잭션 수
export const activeTransactionsData = Array.from({ length: 60 }, (_, i) => {
  const baseValue = 25;
  const variation = Math.sin(i / 7) * 10;
  const noise = Math.random() * 5 - 2.5;
  return Math.max(0, Math.floor(baseValue + variation + noise));
});
