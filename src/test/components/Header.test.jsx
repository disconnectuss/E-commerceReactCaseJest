import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import "@testing-library/jest-dom";
import Header from "../../components/Header";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("Header Component", () => {
  const mockItems = [
    { id: 1, price: 100, quantity: 2 },
    { id: 2, price: 200, quantity: 1 },
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

  test("renders total price correctly", () => {
    render(<Header />);

    expect(screen.getByText("400 ₺")).toBeInTheDocument();
  });

  test("renders user icon and name", () => {
    render(<Header />);

    expect(screen.getByText("Kerem")).toBeInTheDocument();
  });

  test("renders form and input field", () => {
    render(<Header />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
