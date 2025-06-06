import React from "react";
import { render, screen } from "@testing-library/react";
import FormList from "../FormList";
import { fetchBlueprintGraph } from "../../api/fetchBlueprintGraph";

// Correctly mock the API
jest.mock("../../api/fetchBlueprintGraph", () => ({
  fetchBlueprintGraph: jest.fn(),
}));

const mockForms = [
  {
    id: "1",
    name: "Form A",
    description: "Test A",
    field_schema: { properties: {} },
  },
  {
    id: "2",
    name: "Form B",
    description: "Test B",
    field_schema: { properties: {} },
  },
];

describe("FormList", () => {
  beforeEach(() => {
    (fetchBlueprintGraph as jest.Mock).mockResolvedValue({
      forms: mockForms,
      edges: [],
    });
  });

  it("renders forms from API", async () => {
    render(<FormList />);
    expect(await screen.findByText("Form A")).toBeInTheDocument();
    expect(await screen.findByText("Form B")).toBeInTheDocument();
  });
});
