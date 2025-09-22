import { useState, useRef, useEffect } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FilterBar({
  query, setQuery,
  status, setStatus,
  priority, setPriority,
}: {
  query: string; setQuery: (v: string) => void;
  status: 'all' | 'open' | 'done'; setStatus: (v: 'all' | 'open' | 'done') => void;
  priority: 'all' | 'Alta' | 'Media' | 'Baja'; setPriority: (v: 'all' | 'Alta' | 'Media' | 'Baja') => void;
}) {
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const prioRef = useRef<HTMLDivElement>(null);

  // cerrar al hacer click fuera
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setOpenStatus(false);
      if (prioRef.current && !prioRef.current.contains(e.target as Node)) setOpenPriority(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const statusLabel = status === 'all' ? 'Todas' : status === 'open' ? 'Pendientes' : 'Completadas';

  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-black/5 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <FunnelIcon className="h-5 w-5 text-gray-500" />
        <div className="font-medium">Filtros y Búsqueda</div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          <input
            className="input pl-10"
            placeholder="Buscar tareas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="relative" ref={statusRef}>
          <button
            type="button"
            onClick={() => setOpenStatus((v) => !v)}
            className="input w-full text-left flex items-center justify-between"
          >
            <span>{statusLabel}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>

          {openStatus && (
            <div className="absolute mt-1 z-10 rounded-xl bg-white border border-black/10 shadow-md overflow-hidden w-full">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'open', label: 'Pendientes' },
                { key: 'done', label: 'Completadas' },
              ].map((s) => (
                <div
                  key={s.key}
                  className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setStatus(s.key as any); setOpenStatus(false); }}
                >
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={prioRef}>
          <button
            type="button"
            onClick={() => setOpenPriority((v) => !v)}
            className="input w-full text-left flex items-center justify-between"
          >
            <span>{priority === 'all' ? 'Todas las prioridades' : priority}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>

          {openPriority && (
            <div className="absolute mt-1 z-10 rounded-xl bg-white border border-black/10 shadow-md overflow-hidden w-full">
              {(['all', 'Alta', 'Media', 'Baja'] as const).map((p) => (
                <div
                  key={p}
                  className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setPriority(p); setOpenPriority(false); }}
                >
                  {p === 'all' ? 'Todas' : p}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
