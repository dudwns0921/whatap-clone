import { LayoutGrid, ChevronDown, ChevronUp, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDashboardStore } from '../stores/dashboardStore';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar } = useDashboardStore();

  if (isSidebarCollapsed) {
    return (
      <aside className="w-12 h-full bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border-default)] flex flex-col items-center py-2">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors"
          title="사이드바 열기"
        >
          <ChevronRight size={16} className="text-[var(--color-text-secondary)]" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-60 h-full bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border-default)] flex flex-col">
      {/* ElioTap Logo + Collapse Button */}
      <div className="px-3 py-2.5 border-b border-[var(--color-border-default)] flex items-center justify-between">
        <span className="font-bold text-sm text-[var(--color-text-primary)]">ElioTap</span>
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-[var(--color-hover-overlay)] rounded transition-colors"
          title="사이드바 접기"
        >
          <ChevronLeft size={16} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-1">
        {/* 대시보드 메뉴 */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-hover-overlay)] transition-colors"
          >
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} className="text-[var(--color-text-secondary)]" />
              <span className="font-semibold">대시보드</span>
            </div>
            {isExpanded ? (
              <ChevronUp size={12} className="text-[var(--color-text-tertiary)]" />
            ) : (
              <ChevronDown size={12} className="text-[var(--color-text-tertiary)]" />
            )}
          </button>

          {/* 하위 메뉴 */}
          {isExpanded && (
            <div>
              <Link
                to="/"
                className={`w-full flex items-center px-3 py-1.5 pl-8 text-xs font-semibold transition-colors ${
                  location.pathname === '/'
                    ? 'bg-[var(--color-selected-bg)] text-[var(--color-selected-text)]'
                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-hover-overlay)]'
                }`}
              >
                애플리케이션 대시보드
              </Link>
            </div>
          )}
        </div>

        {/* 스토리북 메뉴 */}
        <div>
          <Link
            to="/storybook"
            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors ${
              location.pathname === '/storybook'
                ? 'bg-[var(--color-selected-bg)] text-[var(--color-selected-text)] font-semibold'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--color-hover-overlay)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--color-text-secondary)]" />
              <span className="font-semibold">스토리북</span>
            </div>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
