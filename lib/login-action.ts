'use server';

import { validateImapCredentials } from './imap-checker';

export async function validateLogin(email: string, password: string) {
  return validateImapCredentials(email, password);
}