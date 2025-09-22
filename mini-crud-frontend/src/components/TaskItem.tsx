import { TrashIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Button from './ui/Button';

export type Priority = 'Alta' | 'Media' | 'Baja';

export default function TaskItem({
  id,
  title,
  description,
  done,
  priority,
  onToggle,
  onDelete,
  onChangePriority,
}: {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  priority: Priority;
  onToggle: (checked: boolean) => void;
  onDelete: () => void;
  onChangePriority: (p: Priority) => void;
}) {
  const badge =
    priority === 'Alta'
      ? 'bg-rose-100 text-rose-700'
      : priority === 'Media'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-emerald-100 text-emerald-700';

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      whileHover={{ y: -2, scale: 1.004 }}
      className="rounded-2xl bg-white/90 border border-black/10 p-4 flex items-start justify-between gap-3 shadow-sm"
    >
      {/* IZQUIERDA */}
      <div className="flex items-start gap-3">
        <motion.input
          type="checkbox"
          checked={done}
          onChange={(e) => onToggle(e.target.checked)}
          whileTap={{ scale: 0.9 }}
          className="h-5 w-5 cursor-pointer mt-1"
          aria-label="Marcar completada"
        />
        <div>
          <div className={`font-medium ${done ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {title}
          </div>
          {description && <div className="text-sm text-gray-500">{description}</div>}

          <div className="mt-2 flex items-center gap-2">
            <span className={`text-xs rounded-full px-2 py-0.5 ${badge}`}>{priority}</span>
            {done ? (
              <span className="text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4" />
                Hecha
              </span>
            ) : (
              <span className="text-xs text-amber-600 flex items-center gap-1">
                <ExclamationCircleIcon className="h-4 w-4" />
                Pendiente
              </span>
            )}
          </div>
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-2">
        <select
          className="input py-1.5 h-9"
          value={priority}
          onChange={(e) => onChangePriority(e.target.value as Priority)}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <Button onClick={onDelete} className="btn-danger flex items-center gap-1">
          <TrashIcon className="h-4 w-4" />
          Eliminar
        </Button>
      </div>
    </motion.li>
  );
}
