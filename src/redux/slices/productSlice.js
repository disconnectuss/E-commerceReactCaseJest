import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    const endpoint = _?.text ? `products?search=${_.text}` : "products";

    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    filteredProductList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetProductList: (state) => {
      state.productList = [];
      state.filteredProductList = [];
    },

    sortProducts: (state, action) => {
      const sortBy = action.payload;
      const listToSort =
        state.filteredProductList.length > 0
          ? state.filteredProductList
          : state.productList;

      switch (sortBy) {
        case "new-to-old":
          listToSort.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "old-to-new":
          listToSort.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        case "high-to-low":
          listToSort.sort((a, b) => b.price - a.price);
          break;
        case "low-to-high":
          listToSort.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
      state.filteredProductList = listToSort;
    },

    filterProductsByModel: (state, action) => {
      const selectedModels = action.payload;

      if (selectedModels.length > 0) {
        state.filteredProductList = state.productList.filter((product) =>
          selectedModels.includes(product.model)
        );
      } else {
        state.filteredProductList = state.productList;
      }
    },

    filterProductsByBrand: (state, action) => {
      const selectedBrands = action.payload;

      if (selectedBrands.length > 0) {
        state.filteredProductList =
          state.filteredProductList.length > 0
            ? state.filteredProductList.filter((product) =>
                selectedBrands.includes(product.brand)
              )
            : state.productList.filter((product) =>
                selectedBrands.includes(product.brand)
              );
      } else if (state.filteredProductList.length === 0) {
        state.filteredProductList = state.productList;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.filteredProductList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  resetProductList,
  sortProducts,
  filterProductsByModel,
  filterProductsByBrand,
} = productsSlice.actions;

export default productsSlice.reducer;
