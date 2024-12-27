import db from './db';
import { User } from '../types';

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // For demo purposes, we'll only check against the admin user
  // In production, you'd want proper password hashing and validation
  if (email === 'admin@mail.com' && password === 'password') {
    const user = await db.users.where('email').equals(email).first();
    return user || null;
  }
  return null;
}