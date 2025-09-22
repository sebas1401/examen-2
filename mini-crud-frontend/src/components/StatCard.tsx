import { ReactNode } from 'react';

export default function StatCard({
  icon, label, value, color = 'text-black'
}: { icon: ReactNode; label: string; value: number | string; color?: string }) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-black/5 shadow-sm p-4 flex items-center gap-4">
      <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center shadow">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className={`text-xl font-semibold ${color}`}>{value}</div>
      </div>
    </div>
  );
}
