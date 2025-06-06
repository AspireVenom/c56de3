import { fetchBlueprintGraph } from "../fetchBlueprintGraph";

// Cast the fetch as a jest mock *after* assigning
(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ forms: [], edges: [] }),
  }),
);

describe("fetchBlueprintGraph", () => {
  it("fetches the graph", async () => {
    const result = await fetchBlueprintGraph("1", "bp_x", "bpv_x");
    expect(result).toEqual({ forms: [], edges: [] });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/1/actions/blueprints/bp_x/bpv_x/graph",
      expect.objectContaining({
        headers: { Accept: "application/json" },
      }),
    );
  });
});
