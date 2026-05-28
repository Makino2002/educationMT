import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { User, Session, Settings } from '../types';

interface EducationDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  sessions: {
    key: string;
    value: Session;
    indexes: { 'by-token': string };
  };
  settings: {
    key: string;
    value: Settings;
  };
}

const DB_NAME = 'education_mt_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<EducationDB>> | null = null;

export const initDB = async () => {
  if (typeof window === 'undefined') return null; // Avoid running on server
  
  if (!dbPromise) {
    dbPromise = openDB<EducationDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('by-email', 'email', { unique: true });
        }
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
          sessionStore.createIndex('by-token', 'token', { unique: true });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'userId' });
        }
      },
    });
  }
  return dbPromise;
};

export const getDB = async () => {
  const db = await initDB();
  if (!db) throw new Error('IndexedDB not supported or running on server');
  return db;
};
