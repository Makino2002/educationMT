import { getDB } from '../database/db';
import { User, Session } from '../types';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const authService = {
  async register(email: string, name: string, passwordHash: string): Promise<User> {
    const db = await getDB();
    
    // Check if user exists
    const existingUser = await db.getFromIndex('users', 'by-email', email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: generateId(),
      email,
      name,
      password: passwordHash,
      createdAt: Date.now(),
    };

    await db.put('users', newUser);
    return newUser;
  },

  async login(email: string, passwordHash: string): Promise<{ user: User; session: Session }> {
    const db = await getDB();
    const user = await db.getFromIndex('users', 'by-email', email);
    
    if (!user || user.password !== passwordHash) {
      throw new Error('Invalid email or password');
    }

    const token = generateId() + generateId();
    
    const session: Session = {
      id: generateId(),
      userId: user.id,
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      createdAt: Date.now(),
    };

    await db.put('sessions', session);
    localStorage.setItem('auth_token', token);
    
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword as User, session };
  },

  async logout(token: string) {
    const db = await getDB();
    const session = await db.getFromIndex('sessions', 'by-token', token);
    if (session) {
      await db.delete('sessions', session.id);
    }
    localStorage.removeItem('auth_token');
  },

  async restoreSession(token: string): Promise<User | null> {
    try {
      const db = await getDB();
      const session = await db.getFromIndex('sessions', 'by-token', token);
      
      if (!session || session.expiresAt < Date.now()) {
        localStorage.removeItem('auth_token');
        return null;
      }

      const user = await db.get('users', session.userId);
      if (!user) return null;

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    } catch (e) {
      return null;
    }
  }
};
