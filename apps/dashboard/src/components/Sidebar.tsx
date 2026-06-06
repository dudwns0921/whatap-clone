import {
  Code,
  LayoutGrid,
  LineChart,
  Network,
  FileText,
  BarChart3,
  Cloud,
  File,
  Bell,
  Server,
  Settings,
  Paintbrush,
  Home,
  Star,
  Grid,
} from 'lucide-react';
import { useState } from 'react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  children?: { label: string; active?: boolean }[];
}

const menuItems: MenuItem[] = [
  {
    icon: <Code size={20} />,
    label: '테스트',
  },
  {
    icon: <LayoutGrid size={20} />,
    label: '대시보드',
    children: [{ label: '애플리케이션 대시보드', active: true }],
  },
  {
    icon: <Network size={20} />,
    label: '트랜잭션 맵',
  },
  {
    icon: <Grid size={20} />,
    label: 'Flex 보드',
  },
  {
    icon: <LineChart size={20} />,
    label: '분석',
  },
  {
    icon: <Network size={20} />,
    label: '토폴로지',
  },
  {
    icon: <FileText size={20} />,
    label: '로그',
  },
  {
    icon: <BarChart3 size={20} />,
    label: '통계',
  },
  {
    icon: <Cloud size={20} />,
    label: 'OpenMetrics',
  },
  {
    icon: <File size={20} />,
    label: '보고서',
  },
  {
    icon: <Bell size={20} />,
    label: '경고 알림',
  },
  {
    icon: <Server size={20} />,
    label: '인스턴스 성능 관리',
  },
  {
    icon: <Settings size={20} />,
    label: '관리',
  },
];

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['대시보드']);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <aside className="w-60 h-full bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border-default)] flex flex-col overflow-hidden">
      {/* Scrollable Menu Area */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.children && toggleItem(item.label)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-hover-overlay)] transition-colors relative"
            >
              <span className="text-[var(--color-text-secondary)]">{item.icon}</span>
              <span>{item.label}</span>
            </button>

            {/* Children */}
            {item.children && expandedItems.includes(item.label) && (
              <div className="bg-[var(--color-surface-tertiary)]">
                {item.children.map((child) => (
                  <button
                    key={child.label}
                    className={`
                      w-full flex items-center px-4 py-2 pl-14 text-sm
                      transition-colors relative
                      ${
                        child.active
                          ? 'bg-[var(--color-brand-cyan)] bg-opacity-10 text-[var(--color-brand-cyan)] font-medium'
                          : 'text-[var(--color-text-primary)] hover:bg-[var(--color-hover-overlay)]'
                      }
                    `}
                  >
                    {child.active && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-brand-cyan)]" />
                    )}
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[var(--color-border-default)] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <Paintbrush size={18} className="text-[var(--color-text-secondary)]" />
          </button>
          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <Home size={18} className="text-[var(--color-text-secondary)]" />
          </button>
          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <Star size={18} className="text-[var(--color-text-secondary)]" />
          </button>
          <button className="p-2 hover:bg-[var(--color-hover-overlay)] rounded transition-colors">
            <Grid size={18} className="text-[var(--color-text-secondary)]" />
          </button>
        </div>

        <div className="text-xs text-[var(--color-text-tertiary)] font-mono">PCODE: 49942</div>
      </div>
    </aside>
  );
}
