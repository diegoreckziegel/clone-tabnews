import { Client } from "pg";

async function query(SQL) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  await client.connect();

  const result = await client.query(SQL);
  console.log(result.rows);
}

function test() {
  return "";
}
export default { query: query };
