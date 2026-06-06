export default function TrialBanner() {
  return (
    <div className="bg-[#2a2d3a] border-b border-[var(--color-border-default)] px-4 py-2 flex items-center justify-between">
      <div className="text-sm text-white">무료체험 기간이 14일 남았습니다.</div>

      <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors">
        유료 전환
      </button>
    </div>
  );
}
