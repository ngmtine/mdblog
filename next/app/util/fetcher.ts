/**
 * 型をつけてエラー時にエラー投げるだけのfetchのラッパー
 */
export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("response error");
    return (await response.json()) as T;
};
