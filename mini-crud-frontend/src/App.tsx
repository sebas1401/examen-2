import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksPage from './pages/Tasks';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  // No renderizamos ningún header global aquí.
  // Todo el encabezado con "Cerrar sesión" queda dentro de TasksPage (Topbar).

  const isAuth = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      {/* Sin <header> global */}
      <Routes>
        {/* Redirección raíz */}
        <Route path="/" element={<Navigate to={isAuth ? '/tasks' : '/login'} replace />} />

        {/* Rutas abiertas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* 404 -> redirigimos a raíz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
