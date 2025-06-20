import postgres from "postgres";

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) throw new Error("connectionString is undefined");

export const db = postgres(connectionString);
