import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductCard from "../../components/ProductCard";
import cartReducer from "../../redux/slices/cartSlice";

const mockProduct = {
  id: 1,
  name: "Test Product",
  price: 100,
  image: "test-image.jpg",
};

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe("ProductCard Component", () => {
  test("renders product information correctly", () => {
    render(
      <Provider store={mockStore}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("100₺")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });

  test("renders fallback text if no image is provided", () => {
    const productWithoutImage = { ...mockProduct, image: null };

    render(
      <Provider store={mockStore}>
        <ProductCard product={productWithoutImage} />
      </Provider>
    );

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
  });

  test("renders Add to Cart button and can be clicked", () => {
    render(
      <Provider store={mockStore}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const button = screen.getByText("Add to Cart");
    expect(button).toBeInTheDocument();

    userEvent.click(button);
  });
});
