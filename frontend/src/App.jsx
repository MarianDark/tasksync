import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import DarkModeToggle from './components/DarkModeToggle';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const App = () => (
  <>
    <Navbar />
    <AppRoutes />
    <DarkModeToggle />
    <ToastContainer />
  </>
);

export default App;
