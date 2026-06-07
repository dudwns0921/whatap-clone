import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return '애플리케이션 대시보드';
      case '/storybook':
        return '스토리북';
      default:
        return '애플리케이션 대시보드';
    }
  };

  return (
    <header className="bg-[var(--color-surface-primary)] border-b border-[var(--color-border-default)] flex items-center px-4 py-2">
      <h1 className="text-lg font-bold text-[var(--color-text-primary)]">{getTitle()}</h1>
    </header>
  );
}
