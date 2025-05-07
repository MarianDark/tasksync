import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getTasksByBoard,
  updateTaskStatus,
  createTask,
} from '../services/taskService';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import TaskModal from '../components/TaskModal';
import ChatBox from '../components/ChatBox';

const BoardView = () => {
  const { id: boardId } = useParams();
  const { user } = useSelector((state) => state.user);

  const [columns, setColumns] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': [],
  });

  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      const tasks = await getTasksByBoard(boardId, user.token);
      const grouped = {
        'To Do': [],
        'In Progress': [],
        'Done': [],
      };
      tasks.forEach((task) => {
        grouped[task.status].push(task);
      });
      setColumns(grouped);
    } catch (err) {
      toast.error('Error al cargar tareas');
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const movedTask = columns[source.droppableId].find(t => t._id === draggableId);
    const newColumns = { ...columns };

    newColumns[source.droppableId] = newColumns[source.droppableId].filter(
      t => t._id !== draggableId
    );
    movedTask.status = destination.droppableId;
    newColumns[destination.droppableId].splice(destination.index, 0, movedTask);

    setColumns(newColumns);
    try {
      await updateTaskStatus(draggableId, destination.droppableId, user.token);
    } catch {
      toast.error('Error al actualizar tarea');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return toast.error('Título requerido');

    try {
      const taskCreated = await createTask(
        { ...newTask, boardId, status: 'To Do' },
        user.token
      );
      setColumns((prev) => ({
        ...prev,
        'To Do': [...prev['To Do'], taskCreated],
      }));
      setNewTask({ title: '', description: '' });
      toast.success('Tarea creada');
    } catch (err) {
      toast.error('Error al crear tarea');
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setColumns((prev) => {
      const newCols = { ...prev };
      for (const status in newCols) {
        newCols[status] = newCols[status].map((t) =>
          t._id === updatedTask._id ? updatedTask : t
        );
      }
      return newCols;
    });
  };

  const handleTaskDeleted = (taskId) => {
    setColumns((prev) => {
      const newCols = { ...prev };
      for (const status in newCols) {
        newCols[status] = newCols[status].filter((t) => t._id !== taskId);
      }
      return newCols;
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        Tablero
      </h2>

      {/* Formulario de nueva tarea */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleCreateTask}
        className="w-full mb-6 flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          placeholder="Título"
          className="p-2 border flex-1 bg-white dark:bg-slate-700 dark:text-white"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          className="p-2 border flex-1 bg-white dark:bg-slate-700 dark:text-white"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-slate-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 hover:text-mmlgold min-h-[44px]"
        >
          Crear
        </button>
      </motion.form>

      {/* Tareas Drag and Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="bg-slate-100 dark:bg-slate-800 text-black dark:text-white p-3 rounded min-h-[300px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="font-semibold mb-2">{status}</h3>
                  {columns[status].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-slate-700 text-black dark:text-white p-3 mb-2 rounded shadow text-sm cursor-pointer"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => setSelectedTask(task)}
                        >
                          <strong>{task.title}</strong>
                          <p className="text-gray-500 dark:text-gray-300">
                            {task.description}
                          </p>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal de tarea */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          token={user.token}
          onClose={() => setSelectedTask(null)}
          onUpdated={handleTaskUpdated}
          onDeleted={handleTaskDeleted}
        />
      )}

      {/* Chat en tiempo real */}
      <ChatBox boardId={boardId} user={user} />
    </div>
  );
};

export default BoardView;
