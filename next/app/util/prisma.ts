import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-unused-vars
    var globalPrisma: PrismaClient; // <- Name it whatever you want, except "prisma".
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.globalPrisma) {
        global.globalPrisma = new PrismaClient();
    }
    prisma = global.globalPrisma;
}

export default prisma;

// https://github.com/prisma/prisma/issues/1983
