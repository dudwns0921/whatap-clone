import { Paintbrush } from 'lucide-react';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function IconBar() {
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  return (
    <aside className="w-12 h-full bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border-default)] flex flex-col items-center py-4">
      {/* Spacer - pushes theme button to bottom */}
      <div className="flex-1" />

      {/* Theme Switcher Icon */}
      <div className="relative">
        <button
          onClick={() => setShowThemeSwitcher(!showThemeSwitcher)}
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[var(--color-hover-overlay)] transition-colors"
        >
          <Paintbrush size={20} className="text-[var(--color-text-secondary)]" />
        </button>

        {/* Theme Switcher Popup - positioned next to button */}
        {showThemeSwitcher && <ThemeSwitcher onClose={() => setShowThemeSwitcher(false)} />}
      </div>
    </aside>
  );
}
