import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const base =
        (import.meta as any).env?.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:3000';
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          (Array.isArray(data?.message) ? data.message.join(', ') : data?.message) ||
          data?.error ||
          `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const token: string | undefined = data?.token ?? data?.access_token;
      if (!token) throw new Error('El servidor no devolvió un token');

      localStorage.setItem('token', token);
      window.location.href = '/tasks';
    } catch (err: any) {
      setError(err?.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur rounded-2xl border border-black/5 shadow-lg p-5 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
          <p className="text-gray-500">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          <input
            className="w-full rounded-xl px-4 py-3 bg-white/90 border border-black/10 shadow-sm outline-none transition focus:ring-2 focus:ring-black/20 focus:border-black/20"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl px-4 py-3 bg-white/90 border border-black/10 shadow-sm outline-none transition focus:ring-2 focus:ring-black/20 focus:border-black/20"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-black hover:bg-neutral-900 transition w-full"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
