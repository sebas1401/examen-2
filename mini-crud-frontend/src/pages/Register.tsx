import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Register(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false); const [error,setError]=useState<string|null>(null); const [ok,setOk]=useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/tasks', { replace: true });
    document.title = 'Registro | Registro de Tareas';
  }, []);

  async function onSubmit(e:React.FormEvent){
    e.preventDefault(); setLoading(true); setError(null); setOk(false);
    try{
      const body = { email: email.trim().toLowerCase(), password: password.trim() };
      const res = await fetch(`${API_URL}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      const text = await res.text(); const data = text? JSON.parse(text) : null;
      if(!res.ok) throw new Error(data?.message || res.statusText);
      setOk(true); setTimeout(()=>navigate('/login',{replace:true}), 800);
    }catch(err:any){ setError(err.message || 'Error de registro'); }
    finally{ setLoading(false); }
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl p-7 shadow-xl">
        <h2 className="text-2xl font-semibold mb-1 text-center">Registro</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600">Inicia sesión</Link>
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input type="email" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} required />
          <Input type="password" placeholder="Contraseña (mín. 6)" value={password} onChange={e=>setPassword(e.target.value)} required />
          <Button className="btn-primary w-full" disabled={loading}>{loading?'Creando…':'Crear cuenta'}</Button>
          {error && <p className="text-red-600 text-sm break-all">{error}</p>}
          {ok && <p className="text-green-600 text-sm text-center">¡Cuenta creada! Redirigiendo…</p>}
        </form>
      </Card>
    </div>
  );
}
