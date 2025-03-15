import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on('query', (e: any) => {
  logger.info(e)
})

prismaClient.$on('error', (e: any) => {
  logger.error(e)
})

prismaClient.$on('info', (e: any) => {
  logger.info(e)
})

prismaClient.$on('warn', (e: any) => {
  logger.warn(e)
})
