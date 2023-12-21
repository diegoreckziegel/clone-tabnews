import database from "infra/database.js";

async function status(request, response) {
  const version = await database.version();
  const maxConnections = await database.maxConnections();
  const opendedConnections = await database.opendedConnections();

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: maxConnections,
        opended_connections: opendedConnections,
      },
    },
  });
}

export default status;
