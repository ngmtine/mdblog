import postgres from "postgres";

export const db = postgres({
    host: "localhost",
    port: 5433,
    database: "main",
    username: "dockeruser",
    password: "dockerpass",
});
