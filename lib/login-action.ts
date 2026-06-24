'use server';
import { validateImapCredentials } from './imap-checker';

export async function validateLogin(email: string, password: string) {
  // Decode URL-encoded characters that might get mangled by Vercel
  const decodedPassword = decodeURIComponent(password);
  return validateImapCredentials(email, decodedPassword);
}