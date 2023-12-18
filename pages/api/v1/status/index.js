import database from "infra/database.js";

async function status(request, response) {
  await database.query("SELECT 1+1 soma;");
  response.status(200).json("status é legal");
}

export default status;
