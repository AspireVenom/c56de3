export async function fetchBlueprintGraph(
  tenantId: string,
  blueprintId: string,
  blueprintVersionId: string,
) {
  const response = await fetch(
    `http://localhost:3001/api/v1/${tenantId}/actions/blueprints/${blueprintId}/${blueprintVersionId}/graph`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blueprint graph: ${response.statusText}`);
  }

  return await response.json();
}
