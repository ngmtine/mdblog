import { db } from "./db";

export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T[]> => {
    try {
        return await db.unsafe(query, params);
    } catch (error) {
        console.error(error);
        return [];
    }
};
