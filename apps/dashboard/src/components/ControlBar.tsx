import { Pause, Play } from 'lucide-react';
import { useLiveTimer } from '../hooks/useLiveTimer';

export default function ControlBar() {
  const { formattedTime, isPaused, toggle } = useLiveTimer();

  return (
    <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-default)] px-4 py-2.5 flex items-center gap-3">
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
    </div>
  );
}
