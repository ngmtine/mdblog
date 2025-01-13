import { db } from "./db";

export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T[]> => {
    try {
        const res = await db.unsafe(query, params);
        return res;
    } catch (error) {
        console.error(error);
        return [];
    }
};
