import { Client } from "pg";

async function query(SQL) {
  const client = new Client({
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  await client.connect();
  try {
    const result = await client.query(SQL);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function version() {
  const result = await query("SHOW server_version;");
  return result.rows[0].server_version;
}

async function maxConnections() {
  const result = await query("SHOW max_connections;");
  return parseInt(result.rows[0].max_connections);
}

async function opendedConnections() {
  const dbName = process.env.POSTGRES_DB;
  const result = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [dbName],
  });
  return result.rows[0].count;
}

export default {
  query: query,
  version: version,
  maxConnections: maxConnections,
  opendedConnections: opendedConnections,
};
