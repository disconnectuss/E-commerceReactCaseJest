import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModelFilter from "../../components/ModelFilter";

describe("ModelFilter Component", () => {
  const mockProductList = [
    { id: 1, model: "Model A" },
    { id: 2, model: "Model B" },
    { id: 3, model: "Model A" },
  ];

  const mockOnModelFilter = jest.fn();

  test("renders model options correctly", () => {
    render(
      <ModelFilter
        productList={mockProductList}
        onModelFilter={mockOnModelFilter}
      />
    );

    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    expect(screen.getByLabelText("Model A")).toBeInTheDocument();
    expect(screen.getByLabelText("Model B")).toBeInTheDocument();
  });

  test('shows "No models available" when productList is empty', () => {
    render(<ModelFilter productList={[]} onModelFilter={mockOnModelFilter} />);

    expect(screen.getByText("No models available")).toBeInTheDocument();
  });

  test("calls onModelFilter with the correct models when checkboxes are selected", async () => {
    render(
      <ModelFilter
        productList={mockProductList}
        onModelFilter={mockOnModelFilter}
      />
    );

    const checkboxModelA = screen.getByLabelText("Model A");
    const checkboxModelB = screen.getByLabelText("Model B");

    fireEvent.click(checkboxModelA);

    await waitFor(() => {
      expect(mockOnModelFilter).toHaveBeenCalledWith(["Model A"]);
    });

    fireEvent.click(checkboxModelB);

    await waitFor(() => {
      expect(mockOnModelFilter).toHaveBeenCalledWith(["Model A", "Model B"]);
    });

    fireEvent.click(checkboxModelA);

    await waitFor(() => {
      expect(mockOnModelFilter).toHaveBeenCalledWith(["Model B"]);
    });
  });
});
