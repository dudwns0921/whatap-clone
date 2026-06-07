import { Sun, Moon, Check } from 'lucide-react';
import { useDashboardStore } from '../stores/dashboardStore';
import { useEffect, useRef } from 'react';

interface ThemeSwitcherProps {
  onClose: () => void;
}

export default function ThemeSwitcher({ onClose }: ThemeSwitcherProps) {
  const { theme, setTheme } = useDashboardStore();
  const popupRef = useRef<HTMLDivElement>(null);

  const handleThemeSelect = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="absolute left-full bottom-0 ml-2 w-80 bg-[var(--color-surface-secondary)] border border-[var(--color-border-default)] rounded-lg shadow-xl overflow-hidden z-50"
      style={{ animation: 'slideDown 0.2s ease-out' }}
    >
      {/* Theme Options */}
      <div className="p-2">
        {/* Light */}
        <button
          onClick={() => handleThemeSelect('light')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded transition-colors ${
            theme === 'light' ? 'bg-[var(--color-selected-bg)]' : 'hover:bg-[var(--color-hover-overlay)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <Sun size={20} className={theme === 'light' ? 'text-[var(--color-selected-text)]' : 'text-[var(--color-text-secondary)]'} />
            <span className={`text-sm ${theme === 'light' ? 'text-[var(--color-selected-text)]' : 'text-[var(--color-text-primary)]'}`}>
              Light
            </span>
          </div>
          {theme === 'light' && <Check size={18} className="text-[var(--color-selected-text)]" />}
        </button>

        {/* Dark */}
        <button
          onClick={() => handleThemeSelect('dark')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded transition-colors ${
            theme === 'dark' ? 'bg-[var(--color-selected-bg)]' : 'hover:bg-[var(--color-hover-overlay)]'
          }`}
        >
          <div className="flex items-center gap-3">
            <Moon size={20} className={theme === 'dark' ? 'text-[var(--color-selected-text)]' : 'text-[var(--color-text-secondary)]'} />
            <span className={`text-sm ${theme === 'dark' ? 'text-[var(--color-selected-text)]' : 'text-[var(--color-text-primary)]'}`}>
              Dark
            </span>
          </div>
          {theme === 'dark' && <Check size={18} className="text-[var(--color-selected-text)]" />}
        </button>
      </div>
    </div>
  );
}
