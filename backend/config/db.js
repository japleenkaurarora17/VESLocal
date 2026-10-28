
import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
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
    // conn.connection.host can be undefined for SRV/Atlas URIs; fall back gracefully
    const dbHost = conn.connection.host || conn.connection.db?.databaseName || 'Atlas (SRV)';
    console.log(`[MongoDB] Connected to database: ${dbHost}`);
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
