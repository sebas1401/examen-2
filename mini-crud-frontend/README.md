
# Mini CRUD Seguro de Tareas — Frontend (React + Vite + Tailwind)

## Requisitos
- Node.js 18+

## Pasos rápidos
1. Copia `.env.example` a `.env` y ajusta `VITE_API_URL` (por defecto `http://localhost:3000`).
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Levanta en desarrollo:
   ```bash
   npm run dev
   ```
4. Rutas:
   - `/login` (también enlace a registro)
   - `/register`
   - `/tasks` (protegida — requiere login)

## Notas
- El token JWT se guarda en `localStorage` como `token`.
- La vista de `/tasks` permite crear, listar, alternar `done` y eliminar tareas.
- Maneja estados de `loading`, `error` y `empty state`.
