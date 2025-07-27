// TS Prisma file for RBAC Crud
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from './rbac-db/prisma';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prismaRbac =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaRbac;

export default prismaRbac;
