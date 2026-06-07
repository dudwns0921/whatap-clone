import Header from '../components/Header';
import ControlBar from '../components/ControlBar';
import { LineChart } from 'elio-charts';
import { tpsData, cpuData, memoryData } from '../mock/metricsData';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header />

      {/* Control Bar */}
      <ControlBar />

      {/* Main Content - Widget Grid */}
      <div className="flex-1 overflow-auto bg-[var(--color-dashboard-bg)] p-3">
        <div className="grid grid-cols-3 gap-2">
          {/* Placeholder for widgets */}
          <div className="col-span-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            히트맵 위젯
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            액티브 트랜잭션 위젯
          </div>

          {/* TPS Widget */}
          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md p-4 h-64">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">TPS</h3>
              <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono">
                {tpsData[tpsData.length - 1].value} req/s
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <LineChart data={tpsData} color="#3b82f6" lineWidth={1.5} showGrid={true} />
            </div>
          </div>

          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md p-4 h-64 flex items-center justify-center text-[var(--color-text-tertiary)]">
            Apdex 위젯
          </div>

          {/* CPU Widget */}
          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md p-4 h-64">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">시스템 CPU</h3>
              <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono">
                {cpuData[cpuData.length - 1].value}%
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <LineChart data={cpuData} color="#10b981" lineWidth={1.5} showGrid={true} />
            </div>
          </div>

          {/* Memory Widget */}
          <div className="bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-md p-4 h-64">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">힙 메모리</h3>
              <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono">
                {memoryData[memoryData.length - 1].value} MB
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <LineChart data={memoryData} color="#f59e0b" lineWidth={1.5} showGrid={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
