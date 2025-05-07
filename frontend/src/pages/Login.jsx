import { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      dispatch(loginSuccess(data));
      toast.success('Bienvenido/a');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required className="w-full p-2 border" />
        <button type="submit" className="w-full bg-slate-800 text-white py-2 hover:text-mmlgold">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
