import Header from '../components/Header';
import ControlBar from '../components/ControlBar';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header />

      {/* Control Bar */}
      <ControlBar />

      {/* Main Content - Widget Grid */}
      <div className="flex-1 overflow-auto bg-[var(--color-surface-primary)] p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Placeholder for widgets */}
          <div className="lg:col-span-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            히트맵 위젯
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            액티브 트랜잭션 위젯
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            TPS 위젯
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            Apdex 위젯
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            시스템 CPU 위젯
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            힙 메모리 위젯
          </div>
        </div>
      </div>
    </div>
  );
}
