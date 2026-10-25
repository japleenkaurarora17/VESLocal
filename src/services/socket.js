import { io } from 'socket.io-client';

let socket = null;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

/**
 * Initializes and connects the WebSocket client
 * @param {string} userId - Current student ID
 * @param {string} token - JWT authentication token
 */
export function connectSocket(userId, token) {
  if (socket && socket.connected) {
    return socket;
  }

  try {
    socket = io(SOCKET_URL, {
      auth: { token },
      query: { userId: userId || 'anonymous' },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      autoConnect: true
    });

    socket.on('connect', () => {
      console.log(`[Socket.IO] Connected to real-time gateway: ${socket.id}`);
    });

    socket.on('connect_error', (error) => {
      console.warn('[Socket.IO] Real-time connection unavailable (operating in demo offline mode):', error.message);
    });

    return socket;
  } catch (err) {
    console.warn('[Socket.IO] Initialization error:', err);
    return null;
  }
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function joinChat(chatId) {
  if (socket && socket.connected && chatId) {
    socket.emit('join_chat', chatId);
  }
}

export function sendChatMessage(chatId, message) {
  if (socket && socket.connected) {
    socket.emit('send_message', { chatId, message });
    return true;
  }
  return false;
}

export function onChatMessage(callback) {
  if (!socket) return () => {};
  socket.on('receive_message', callback);
  return () => {
    socket.off('receive_message', callback);
  };
}

export function onNotification(callback) {
  if (!socket) return () => {};
  socket.on('receive_notification', callback);
  return () => {
    socket.off('receive_notification', callback);
  };
}

export default {
  connectSocket,
  disconnectSocket,
  joinChat,
  sendChatMessage,
  onChatMessage,
  onNotification
};
