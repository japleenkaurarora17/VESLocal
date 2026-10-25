import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.warn('[MongoDB] No MONGODB_URI configured in environment variables.');
    console.warn('[MongoDB] Server will operate in demo fallback mode (in-memory persistence).');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[MongoDB] Connection failed: ${error.message}`);
    console.warn('[MongoDB] Falling back to demo mode for testing.');
    isConnected = false;
    return false;
  }
}

export function getDBStatus() {
  return {
    connected: isConnected,
    state: mongoose.connection.readyState,
    statusText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
  };
}

export default connectDB;
