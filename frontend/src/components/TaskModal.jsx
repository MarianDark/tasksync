import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import API from '../services/api';

const TaskModal = ({ task, onClose, onUpdated, onDeleted, token }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(
        `/tasks/${task._id}/update`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Tarea actualizada');
      onUpdated(res.data);
      onClose();
    } catch {
      toast.error('Error al actualizar tarea');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Tarea eliminada');
      onDeleted(task._id);
      onClose();
    } catch {
      toast.error('Error al eliminar tarea');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-lg w-full max-w-md"
          initial={{ scale: 0.8, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: -50 }}
        >
          <h2 className="text-xl font-semibold mb-4">Editar tarea</h2>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border dark:bg-slate-700 dark:text-white"
              placeholder="Título"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border dark:bg-slate-700 dark:text-white"
              placeholder="Descripción"
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 dark:bg-slate-600 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white hover:text-mmlgold rounded"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
