// importação da biblioteca prisma
import {PrismaClient} from '@prisma/client';

// criação de uma instância do prisma
const prisma = new PrismaClient();

// exportação da instância do prisma
export {prisma};