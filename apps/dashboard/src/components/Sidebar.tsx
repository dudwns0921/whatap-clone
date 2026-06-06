import { LayoutGrid, Paintbrush } from 'lucide-react';
import { useState } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, setTheme } = useDashboardStore();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'presentation'> = ['light', 'dark', 'presentation'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <aside className="w-60 h-full bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border-default)] flex flex-col">
      {/* WhaTap Logo */}
      <div className="p-4 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-1 h-5 bg-[var(--color-brand-cyan)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-green)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-yellow)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-red)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-purple)] rounded-sm" />
          </div>
          <span className="font-bold text-lg text-[var(--color-text-primary)]">WhaTap</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* 대시보드 메뉴 */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-hover-overlay)] transition-colors"
          >
            <LayoutGrid size={20} className="text-[var(--color-text-secondary)]" />
            <span>대시보드</span>
          </button>

          {/* 하위 메뉴 */}
          {isExpanded && (
            <div className="bg-[var(--color-surface-tertiary)]">
              <button className="w-full flex items-center px-4 py-2 pl-14 text-sm bg-[var(--color-brand-cyan)] bg-opacity-10 text-[var(--color-brand-cyan)] font-medium transition-colors relative">
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-brand-cyan)]" />
                애플리케이션 대시보드
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Section - Theme Switcher Only */}
      <div className="border-t border-[var(--color-border-default)] p-4">
        <button
          onClick={cycleTheme}
          className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors"
          title={`Current theme: ${theme}`}
        >
          <Paintbrush size={18} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>
    </aside>
  );
}
