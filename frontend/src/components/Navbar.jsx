import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <nav className="w-full px-4 py-3 bg-slate-800 text-white flex items-center justify-between">
        <Link to="/" className="text-lg font-bold hover:text-mmlgold">
          TaskSync
        </Link>

        {/* Desktop: visible desde sm en adelante */}
        {user && (
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/dashboard" className="hover:text-mmlgold">Dashboard</Link>
            <span>Hola, {user.user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-slate-700 px-3 py-1 rounded hover:text-mmlgold"
            >
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Mobile: visible solo en xs */}
        {user && (
          <button
            onClick={() => setOpenMenu(true)}
            className="sm:hidden text-2xl"
          >
            ☰
          </button>
        )}
      </nav>

      {/* Menú móvil animado */}
      <MobileMenu open={openMenu} onClose={() => setOpenMenu(false)} user={user?.user} />
    </>
  );
};

export default Navbar;
