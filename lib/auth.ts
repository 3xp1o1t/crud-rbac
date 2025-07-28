import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prismaRbac from './rbac-prisma';

export const auth = betterAuth({
  database: prismaAdapter(prismaRbac, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
});
