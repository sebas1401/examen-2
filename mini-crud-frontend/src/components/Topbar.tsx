// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './ui/Button';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const isAuth = Boolean(token);
  const onTasks = location.pathname.startsWith('/tasks');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/70 text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide">
          Registro de Tareas
        </Link>

        {/* Reglas de visibilidad:
           - Si NO hay sesión: mostrar Login / Registro
           - Si hay sesión y estás en /tasks: NO mostrar "Salir" (solo dejamos el botón interno de la página)
           - Si hay sesión y NO estás en /tasks: mostrar "Salir" aquí en el navbar
        */}
        {!isAuth ? (
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/login" className="hover:opacity-80">Login</Link>
            <Link to="/register" className="hover:opacity-80">Registro</Link>
          </nav>
        ) : !onTasks ? (
          <Button onClick={logout} className="btn-primary">
            Salir
          </Button>
        ) : null}
      </div>
    </header>
  );
}
