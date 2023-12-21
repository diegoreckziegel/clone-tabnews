test("get to api/v1/status should be 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const bodyResponse = await response.json();
  expect(bodyResponse.updated_at).toBeDefined();

  const updatedAt = new Date(bodyResponse.updated_at).toISOString();
  expect(bodyResponse.updated_at).toEqual(updatedAt);

  expect(bodyResponse.dependencies.database.version).toEqual("16.1");
  expect(bodyResponse.dependencies.database.max_connections).toEqual(100);
  expect(bodyResponse.dependencies.database.opended_connections).toEqual(1);
});
