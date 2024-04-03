import { env } from "src/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
