import { Pause, Play, ChevronDown, ShieldX, Search } from 'lucide-react';
import { useLiveTimer } from '../hooks/useLiveTimer';
import { useDashboardStore } from '../stores/dashboardStore';

export default function ControlBar() {
  const { formattedTime, isPaused, toggle } = useLiveTimer();
  const { selectedAgent, timeRange } = useDashboardStore();

  return (
    <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-default)] px-4 py-2.5 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* LIVE Badge */}
        <div className="flex items-center gap-2 bg-[var(--color-live-bg)] border border-[var(--color-live-border)] rounded px-2 py-1">
          <span className="w-2 h-2 bg-[var(--color-live-dot)] rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-[var(--color-live-text)]">LIVE</span>
        </div>

        {/* Timer */}
        <div className="font-mono text-sm font-medium text-[var(--color-text-primary)]">
          {formattedTime}
        </div>

        {/* Pause/Resume Button */}
        <button
          onClick={toggle}
          className="p-1.5 hover:bg-[var(--color-hover-overlay)] rounded transition-colors"
        >
          {isPaused ? (
            <Play size={16} className="text-[var(--color-text-secondary)]" />
          ) : (
            <Pause size={16} className="text-[var(--color-text-secondary)]" />
          )}
        </button>

        {/* Agent Dropdown */}
        <div className="flex items-center gap-1.5 ml-2">
          <span className="text-xs text-[var(--color-text-tertiary)]">에이전트</span>
          <button className="flex items-center gap-1.5 px-2 py-1 bg-[var(--color-surface-primary)] border border-[var(--color-border-default)] rounded text-sm hover:bg-[var(--color-hover-overlay)] transition-colors">
            <span className="text-[var(--color-text-primary)]">{selectedAgent}</span>
            <ChevronDown size={14} className="text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-secondary)]">Total</span>
          <span className="font-mono text-sm font-semibold text-[var(--color-text-primary)]">
            1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-secondary)]">Active</span>
          <span className="font-mono text-sm font-semibold text-[var(--color-brand-green)]">
            1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-secondary)]">Inactive</span>
          <span className="font-mono text-sm font-semibold text-[var(--color-text-tertiary)]">
            0
          </span>
        </div>

        <button className="p-1.5 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
          <ShieldX size={16} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface-primary)] border border-[var(--color-border-default)] rounded">
          <Search size={14} className="text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none w-32"
          />
        </div>

        {/* Time Range Dropdown */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-primary)] border border-[var(--color-border-default)] rounded text-sm hover:bg-[var(--color-hover-overlay)] transition-colors">
          <span className="text-[var(--color-text-primary)]">{timeRange}</span>
          <ChevronDown size={14} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>
    </div>
  );
}
