// src/components/ChatBox.jsx
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import API from '../services/api'; // Axios configurado

const socket = io('http://localhost:5000'); // Cambia por tu backend en producción

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
    <div className="mt-6 bg-slate-100 dark:bg-slate-800 p-4 rounded shadow w-full max-w-2xl">
      <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">
        Chat del tablero
      </h3>
      <div className="h-[200px] sm:h-[240px] overflow-y-auto bg-white dark:bg-slate-700 p-2 rounded mb-2">
        {chat.map((msg, index) => (
          <div key={index} className="mb-1 text-sm text-slate-800 dark:text-white">
            <strong>{msg.sender}</strong>: {msg.text}
            <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded text-sm w-full dark:bg-slate-600 dark:text-white"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded hover:text-mmlgold min-h-[44px]"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
