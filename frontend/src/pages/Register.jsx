import { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Nombre" onChange={handleChange} required className="w-full p-2 border" />
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required className="w-full p-2 border" />
        <button type="submit" className="w-full bg-slate-800 text-white py-2 hover:text-mmlgold">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
