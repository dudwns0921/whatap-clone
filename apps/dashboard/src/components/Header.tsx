import { Search, ArrowLeft, Megaphone, Bell, FileText, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 bg-[var(--color-surface-primary)] border-b border-[var(--color-border-default)] flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* WhaTap Logo */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-1 h-5 bg-[var(--color-brand-cyan)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-green)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-yellow)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-red)] rounded-sm" />
            <div className="w-1 h-5 bg-[var(--color-brand-purple)] rounded-sm" />
          </div>
          <span className="font-bold text-lg">WhaTap</span>
        </div>

        <button className="p-1.5 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
          <Search size={18} className="text-[var(--color-text-secondary)]" />
        </button>

        <button className="p-1.5 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
          <ArrowLeft size={18} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Center Title */}
      <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-[var(--color-text-primary)]">
        애플리케이션 대시보드
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm border-2 border-[var(--color-brand-purple)] text-[var(--color-brand-purple)] rounded hover:bg-[var(--color-brand-purple)] hover:bg-opacity-10 transition-colors">
          WhaTap AI
        </button>

        <button className="px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
          Docs
        </button>

        <div className="flex items-center gap-1 ml-2">
          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <Megaphone size={18} className="text-[var(--color-text-secondary)]" />
          </button>

          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors relative">
            <Bell size={18} className="text-[var(--color-text-secondary)]" />
            <span className="absolute top-1 right-1 bg-[var(--color-brand-red)] text-white text-[9px] font-bold px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
              18
            </span>
          </button>

          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <FileText size={18} className="text-[var(--color-text-secondary)]" />
          </button>

          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <MessageCircle size={18} className="text-[var(--color-text-secondary)]" />
          </button>

          <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-sm ml-1">
            J
          </button>
        </div>
      </div>
    </header>
  );
}
