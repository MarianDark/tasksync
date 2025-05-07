const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('API TaskSync funcionando');
});

// Servidor con Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('✅ Usuario conectado:', socket.id);

  socket.on('joinBoard', (boardId) => {
    socket.join(boardId);
    console.log(`🔗 Usuario unido a la sala del tablero ${boardId}`);
  });

  socket.on('sendMessage', async ({ boardId, message }) => {
    io.to(boardId).emit('receiveMessage', message);
    try {
      await Message.create({ ...message, boardId });
    } catch (err) {
      console.error('❌ Error al guardar mensaje:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
