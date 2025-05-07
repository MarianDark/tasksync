import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBoards, createBoard } from '../services/boardService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const { user } = useSelector((state) => state.user);

  const loadBoards = async () => {
    try {
      const data = await getBoards(user.token);
      setBoards(data);
    } catch (err) {
      toast.error('Error al cargar tableros');
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newTitle) return toast.error('El título es requerido');
    try {
      const board = await createBoard(newTitle, user.token);
      setBoards([...boards, board]);
      setNewTitle('');
      toast.success('Tablero creado');
    } catch (err) {
      toast.error('Error al crear tablero');
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Tableros</h2>

      <form onSubmit={handleCreateBoard} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nuevo tablero..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 p-2 border"
        />
        <button className="bg-slate-800 text-white px-4 hover:text-mmlgold">
          Crear
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boards.map((board) => (
          <Link
            key={board._id}
            to={`/board/${board._id}`}
            className="block p-4 border rounded shadow hover:bg-slate-50"
          >
            <h3 className="font-semibold text-lg">{board.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
