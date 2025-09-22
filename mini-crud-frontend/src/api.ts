export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function api(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', 'Bearer ' + token);
  }

  const res = await fetch(API_URL + path, { ...options, headers });

  // Token inválido/expirado → salir a /login
  if (res.status === 401) {
    localStorage.removeItem('token');
    try { window.location.href = '/login'; } catch {}
  }

  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text || null; }

  if (!res.ok) {
    const msg = data?.message || data || res.statusText;
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
  return data;
}
