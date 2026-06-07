import { LayoutGrid, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <aside className="w-60 h-full bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border-default)] flex flex-col">
      {/* ElioTap Logo (텍스트만) */}
      <div className="px-3 py-2.5 border-b border-[var(--color-border-default)]">
        <span className="font-bold text-sm text-[var(--color-text-primary)]">ElioTap</span>
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
