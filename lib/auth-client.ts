import { createAuthClient } from 'better-auth/react';
const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// Exportar solamente las funciones necesarias
export const { signIn, signUp, useSession } = authClient;
