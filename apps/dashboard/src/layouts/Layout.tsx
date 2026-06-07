import { ReactNode } from 'react';
import IconBar from '../components/IconBar';
import Sidebar from '../components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full h-screen overflow-hidden" style={{ minWidth: '1280px', minHeight: '720px' }}>
      {/* Icon Bar (좁은 바) */}
      <IconBar />

      {/* Sidebar (메인 사이드바) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
