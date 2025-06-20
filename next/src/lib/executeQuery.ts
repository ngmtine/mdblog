import type { SerializableParameter } from "postgres";
import { db } from "./db";

export const executeQuery = async <T>(query: string, params: SerializableParameter[] = []): Promise<T[]> => {
    return (await db.unsafe(query, params)) as T[];
};
