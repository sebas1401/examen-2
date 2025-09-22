import { motion } from 'framer-motion';

export default function Background() {
  const blob = 'pointer-events-none absolute rounded-full blur-3xl opacity-[.22] mix-blend-multiply';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* gradiente base animado */}
      <div className="absolute inset-0 animate-slow-gradient bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(0,0,0,.05),transparent_45%),radial-gradient(1200px_circle_at_80%_20%,rgba(0,0,0,.045),transparent_48%)]" />

      {/* blobs vivos */}
      <motion.div
        className={`${blob} bg-gradient-to-tr from-fuchsia-400 to-purple-300 w-[40rem] h-[40rem] -top-28 -left-24`}
        animate={{ x: [0, 40, -10, 0], y: [0, 12, -16, 0], rotate: [0, 10, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${blob} bg-gradient-to-tr from-sky-400 to-cyan-300 w-[36rem] h-[36rem] top-28 -right-24`}
        animate={{ x: [0, -28, 18, 0], y: [0, -12, 18, 0], rotate: [0, -8, 6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${blob} bg-gradient-to-tr from-amber-300 to-rose-400 w-[30rem] h-[30rem] -bottom-16 left-1/3`}
        animate={{ x: [0, 16, -12, 0], y: [0, 16, -8, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* aro muy sutil girando para textura premium */}
      <motion.div
        className="absolute -inset-24 rounded-full bg-[conic-gradient(from_0deg,rgba(0,0,0,.05),transparent_35%,rgba(0,0,0,.05))]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />

      {/* viñeta superior para profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_620px_at_50%_0%,rgba(0,0,0,.12),transparent)]" />
    </div>
  );
}
