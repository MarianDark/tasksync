import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import DarkModeToggle from './components/DarkModeToggle';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <AppRoutes />
    <DarkModeToggle />
    <ToastContainer />
  </BrowserRouter>
);

export default App;
