import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import "@testing-library/jest-dom";
import Cart from "../../components/Cart";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("Cart Component", () => {
  const mockItems = [
    { id: 1, name: "Product A", price: 100, quantity: 2 },
    { id: 2, name: "Product B", price: 200, quantity: 1 },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        cart: {
          items: mockItems,
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders cart items and total price correctly", () => {
    render(<Cart />);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();

    expect(screen.getByText("100₺")).toBeInTheDocument();
    expect(screen.getByText("200₺")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("400 ₺")).toBeInTheDocument();
  });

  test("renders empty cart message if no items", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        cart: {
          items: [],
        },
      })
    );

    render(<Cart />);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  test("increments and decrements quantity buttons are rendered", () => {
    render(<Cart />);

    expect(screen.getAllByText("+")[0]).toBeInTheDocument();
    expect(screen.getAllByText("-")[0]).toBeInTheDocument();
  });
});
