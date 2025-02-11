import { PrismaClient } from '@prisma/client';

// Cast de globalThis para incluir la propiedad opcional prisma
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Reutiliza la instancia existente o crea una nueva
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Guarda la instancia en global en modo desarrollo
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
