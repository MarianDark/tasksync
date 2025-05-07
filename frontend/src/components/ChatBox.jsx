import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import API from '../services/api'; // Axios configurado

const socket = io('http://localhost:5000'); // Cambia en producción

const ChatBox = ({ boardId, user }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/messages/${boardId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChat(res.data);
      } catch (err) {
        console.error('Error cargando historial de chat');
      }
    };

    fetchHistory();
    socket.emit('joinBoard', boardId);
    socket.on('receiveMessage', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [boardId, user.token]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    const newMsg = {
      sender: user.name,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('sendMessage', { boardId, message: newMsg });
    setChat((prev) => [...prev, newMsg]);
    setMessage('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-xl w-full max-w-2xl">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 underline decoration-yellow-400 decoration-2">
        Chat del tablero
      </h3>
      <div className="h-[240px] overflow-y-auto bg-slate-50 dark:bg-slate-700 p-3 rounded-lg shadow-inner space-y-2 text-sm">
        {chat.map((msg, index) => (
          <div
            key={index}
            className="bg-yellow-100 dark:bg-slate-600 p-2 rounded-lg shadow-sm"
          >
            <strong className="text-yellow-700 dark:text-yellow-300">{msg.sender}</strong>:{" "}
            <span className="text-slate-800 dark:text-white">{msg.text}</span>
            <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 mt-4">
        <input
          type="text"
          className="flex-1 p-3 border rounded-xl text-sm dark:bg-slate-600 dark:text-white bg-white shadow"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-slate-800 to-yellow-500 text-white font-semibold px-5 py-2 rounded-xl shadow hover:brightness-110 transition min-h-[44px]"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
