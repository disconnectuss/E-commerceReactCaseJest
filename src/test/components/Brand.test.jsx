import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BrandFilter from "../../components/BrandFilter";

describe("BrandFilter Component", () => {
  const mockProductList = [
    { brand: "Brand A", model: "Model A" },
    { brand: "Brand B", model: "Model B" },
    { brand: "Brand C", model: "Model C" },
    { brand: "Brand A", model: "Model D" },
  ];

  const mockOnBrandFilter = jest.fn();

  test("renders brands and allows selection", () => {
    render(
      <BrandFilter
        productList={mockProductList}
        onBrandFilter={mockOnBrandFilter}
      />
    );

    const brandACheckbox = screen.getByLabelText("Brand A");
    const brandBCheckbox = screen.getByLabelText("Brand B");
    const brandCCheckbox = screen.getByLabelText("Brand C");

    fireEvent.click(brandACheckbox);
    expect(brandACheckbox).toBeChecked();
    expect(mockOnBrandFilter).toHaveBeenCalledWith(["Brand A"]);

    fireEvent.click(brandBCheckbox);
    expect(brandBCheckbox).toBeChecked();
    expect(mockOnBrandFilter).toHaveBeenCalledWith(["Brand A", "Brand B"]);

    fireEvent.click(brandACheckbox);
    expect(brandACheckbox).not.toBeChecked();
    expect(mockOnBrandFilter).toHaveBeenCalledWith(["Brand B"]);
  });

  test('renders "No brands available" if no brands', () => {
    render(<BrandFilter productList={[]} onBrandFilter={mockOnBrandFilter} />);

    expect(screen.getByText("No brands available")).toBeInTheDocument();
  });
});
