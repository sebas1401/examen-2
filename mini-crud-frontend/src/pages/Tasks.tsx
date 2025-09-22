import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import TaskItem, { Priority } from '../components/TaskItem';
import { api } from '../api';

type Task = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
};

type StatusFilter = 'all' | 'open' | 'done';
type PriorityFilter = 'all' | Priority;

export default function TasksPage() {
  const [items, setItems] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [status, setStatus] = useState<StatusFilter>('all');
  const [priority, setPriority] = useState<PriorityFilter>('all');
  const [query, setQuery] = useState('');

  // Mapa de prioridad por tarea (persistido)
  const [priorityMap, setPriorityMap] = useState<Record<number, Priority>>(() => {
    try {
      if (typeof window === 'undefined') return {};
      const raw = localStorage.getItem('task_priority_map');
      return raw ? (JSON.parse(raw) as Record<number, Priority>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('task_priority_map', JSON.stringify(priorityMap));
    }
  }, [priorityMap]);

  const setTaskPriority = (id: number, prio: Priority) =>
    setPriorityMap((m) => ({ ...m, [id]: prio }));

  // Cargar tareas
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await api('/tasks');
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Crear
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createTask = async () => {
    if (!title.trim()) return;
    const res = await api('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    });
    setItems((prev) => [res, ...prev]);
    setTaskPriority(res.id, 'Media'); // prioridad por defecto
    setTitle('');
    setDescription('');
  };

  // Toggle done
  const toggleDone = async (id: number, checked: boolean) => {
    const updated = await api(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ done: checked }),
    });
    setItems((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  // Delete
  const removeTask = async (id: number) => {
    await api(`/tasks/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((t) => t.id !== id));
    setPriorityMap((m) => {
      const { [id]: _, ...rest } = m;
      return rest;
    });
  };

  // Logout (botón del header interno)
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Métricas rápidas
  const total = items.length;
  const doneCount = items.filter((t) => t.done).length;
  const openCount = total - doneCount;

  // Filtrado
  const filtered = useMemo(() => {
    let out = items.slice();

    if (status === 'open') out = out.filter((t) => !t.done);
    if (status === 'done') out = out.filter((t) => t.done);

    if (priority !== 'all') {
      out = out.filter((t) => (priorityMap[t.id] ?? 'Media') === priority);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      out = out.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description ?? '').toLowerCase().includes(q)
      );
    }

    return out;
  }, [items, status, priority, priorityMap, query]);

  return (
    <div className="min-h-screen">
      {/* Header interno con botón Salir */}
      <div className="sticky top-0 z-20 bg-black/75 text-white backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold tracking-wide">Registro de Tareas</h1>
          <Button onClick={logout} className="btn-primary">Salir</Button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* KPIs */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="card">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-semibold">{total}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500">Pendientes</div>
            <div className="text-2xl font-semibold">{openCount}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500">Completadas</div>
            <div className="text-2xl font-semibold">{doneCount}</div>
          </div>
        </section>

        {/* Crear */}
        <section className="card space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input"
              placeholder="Descripción (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button onClick={createTask} className="btn-primary w-full md:w-auto">
            Crear
          </Button>
        </section>

        {/* Filtros */}
        <section className="card space-y-3">
          <div className="text-sm font-medium">Filtros y Búsqueda</div>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="relative">
              <input
                className="input pl-9"
                placeholder="Buscar tareas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔎
              </span>
            </div>

            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
            >
              <option value="all">Todas</option>
              <option value="open">Pendientes</option>
              <option value="done">Completadas</option>
            </select>

            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityFilter)}
            >
              <option value="all">Cualquier prioridad</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
        </section>

        {/* Lista */}
        <section className="space-y-3">
          <div className="text-sm text-gray-500">{filtered.length} tareas</div>

          {loading ? (
            <div className="card">Cargando...</div>
          ) : filtered.length === 0 ? (
            <div className="card text-center text-gray-500">
              No hay tareas que coincidan.
            </div>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {filtered.map((t) => (
                  <TaskItem
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    done={t.done}
                    priority={priorityMap[t.id] ?? 'Media'}
                    onToggle={(checked) => toggleDone(t.id, checked)}
                    onDelete={() => removeTask(t.id)}
                    onChangePriority={(p) => setTaskPriority(t.id, p)}
                  />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
