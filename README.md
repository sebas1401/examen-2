# Registro de Tareas — Mini CRUD (Frontend)

Pequeño proyecto de **gestión de tareas** con autenticación, filtros y UI moderna (Tailwind + fondo animado).

## ✨ Features
- 🔐 Login/Registro con token en `localStorage`
- ✅ CRUD de tareas (crear, marcar completada, eliminar)
- 🏷️ Prioridad por tarea (Alta/Media/Baja) + persistencia local
- 🔎 Filtros por estado/prioridad y búsqueda por texto
- 💅 Tailwind CSS + animaciones sutiles (Framer Motion)
- ⚡ Vite + React + TypeScript

## 🧱 Stack
React, TypeScript, Vite, Tailwind CSS, Framer Motion.

## 🚀 Cómo correr
```bash
# 1) Instalar deps
npm install

# 2) (Opcional) Variables de entorno
# Copia .env.example a .env y ajusta:
# VITE_API_URL=http://localhost:3000

# 3) Dev
npm run dev

# 4) Build / Preview
npm run build
npm run preview
