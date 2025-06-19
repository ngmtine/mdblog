import postgres from "postgres";

const connectionString = process.env.CONNECTION_STRING;

export const db = connectionString
    ? // supabase
      postgres(connectionString)
    : // docker
      postgres({
          host: "localhost",
          port: 5433,
          database: "main",
          user: "dockeruser",
          password: "dockerpass",
      });
