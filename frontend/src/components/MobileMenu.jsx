import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const MobileMenu = ({ open, onClose, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-slate-800 shadow-lg z-50 p-6 flex flex-col gap-4"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="text-right text-gray-600 dark:text-white hover:text-mmlgold text-xl"
            >
              ✕
            </button>

            <nav className="mt-6 space-y-4">
              <Link to="/" onClick={onClose} className="block text-lg text-slate-800 dark:text-white hover:text-mmlgold">
                Inicio
              </Link>
              <Link to="/dashboard" onClick={onClose} className="block text-lg text-slate-800 dark:text-white hover:text-mmlgold">
                Dashboard
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-left w-full text-lg text-red-600 hover:underline"
                >
                  Cerrar sesión
                </button>
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
