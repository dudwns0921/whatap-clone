import { Pause, Play } from 'lucide-react';
import { useLiveTimer } from '../hooks/useLiveTimer';

export default function ControlBar() {
  const { formattedTime, isPaused, toggle } = useLiveTimer();

  return (
    <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-default)] px-4 py-1.5 flex items-center gap-2">
      {/* Pause/Resume Button */}
      <button
        onClick={toggle}
        className="w-6 h-6 flex items-center justify-center border border-[var(--color-border-default)] rounded hover:bg-[var(--color-hover-overlay)] transition-colors"
      >
        {isPaused ? (
          <Play size={12} className="text-[var(--color-text-secondary)]" />
        ) : (
          <Pause size={12} className="text-[var(--color-text-secondary)]" />
        )}
      </button>

      {/* LIVE Badge */}
      <div className="flex items-center gap-1.5 bg-[var(--color-live-bg)] border border-[var(--color-live-border)] rounded px-2 py-0.5">
        <span className="w-2 h-2 bg-[var(--color-live-dot)] rounded-full animate-pulse" />
        <span className="text-[11px] font-bold text-[var(--color-live-text)] font-mono">LIVE {formattedTime}</span>
      </div>
    </div>
  );
}
