
# Mini CRUD Seguro de Tareas — Backend (NestJS)

## Requisitos
- Node.js 18+
- Docker Desktop (para PostgreSQL) **o** PostgreSQL 13+ local
- Git (opcional)

## Pasos rápidos
1. Clona o descomprime este proyecto.
2. Copia `.env.example` a `.env` y ajusta si es necesario.
3. Levanta la base de datos con Docker:
   ```bash
   docker compose up -d
   ```
4. Instala dependencias:
   ```bash
   npm install
   ```
5. Ejecuta migraciones:
   ```bash
   npm run migration:run
   ```
6. Arranca en desarrollo:
   ```bash
   npm run start:dev
   ```
7. Endpoints:
   - `POST /auth/register` `{ email, password }`
   - `POST /auth/login` `{ email, password }` → `{ access_token }`
   - **Protegidos** (Bearer Token):
     - `GET /tasks`
     - `POST /tasks` `{ title, description? }`
     - `GET /tasks/:id`
     - `PATCH /tasks/:id` `{ title?, description?, done? }`
     - `DELETE /tasks/:id`

## Migraciones
- `npm run migration:run` — aplica migraciones
- `npm run migration:revert` — revierte última migración
- `npm run migration:generate` — genera a partir de entidades

## Notas
- Las tareas están asociadas al usuario autenticado.
- CORS habilitado. Ajusta `CORS_ORIGIN` en `.env` si lo necesitas.
