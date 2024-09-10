import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SortBy from "../../components/SortBy";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../redux/slices/cartSlice";

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe("SortBy Component", () => {
  test("renders all sorting options and allows selection", () => {
    render(
      <Provider store={mockStore}>
        <SortBy />
      </Provider>
    );

    const oldToNewRadio = screen.getByLabelText("Old to new");
    const newToOldRadio = screen.getByLabelText("New to old");
    const highToLowRadio = screen.getByLabelText("Price high to low");
    const lowToHighRadio = screen.getByLabelText("Price low to high");

    expect(oldToNewRadio).not.toBeChecked();
    expect(newToOldRadio).not.toBeChecked();
    expect(highToLowRadio).not.toBeChecked();
    expect(lowToHighRadio).not.toBeChecked();

    fireEvent.click(oldToNewRadio);
    expect(oldToNewRadio).toBeChecked();

    fireEvent.click(newToOldRadio);
    expect(newToOldRadio).toBeChecked();
    expect(oldToNewRadio).not.toBeChecked();

    fireEvent.click(highToLowRadio);
    expect(highToLowRadio).toBeChecked();
    expect(newToOldRadio).not.toBeChecked();

    fireEvent.click(lowToHighRadio);
    expect(lowToHighRadio).toBeChecked();
    expect(highToLowRadio).not.toBeChecked();
  });
});
