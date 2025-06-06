// src/api/fetchBlueprintGraph.ts
//
import { GraphResponse } from "../types/graph";

export async function fetchBlueprintGraph(): Promise<GraphResponse> {
  const res = await fetch(
    "https://api.avantos-dev.io/api/v1/123/actions/blueprints/bp_456/bpv_123/graph",
    {
      headers: {
        Accept: "application/json, appliocation/problem+json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`HTTP error ${response.status}: failed to fetch`);
  }

  return res.json;
}
