import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SortBy from "../components/SortBy";
import BrandFilter from "../components/BrandFilter";
import ModelFilter from "../components/ModelFilter";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import {
  fetchProducts,
  filterProductsByBrand,
  filterProductsByModel,
} from "../redux/slices/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { productList, filteredProductList, isLoading, error } = useSelector(
    (state) => state.products
  );

  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleModelFilter = (selectedModels) => {
    setSelectedModels(selectedModels);
    dispatch(filterProductsByModel(selectedModels));
  };

  const handleBrandFilter = (selectedBrands) => {
    setSelectedBrands(selectedBrands);
    dispatch(filterProductsByBrand(selectedBrands));
  };

  return (
    <div className="min-h-screen ml-0">
      <Header />
      <div className="content flex flex-col lg:flex-row py-10 px-8">
        <div className="boxes flex flex-row md:flex-col w-full md:w-1/4 gap-5">
          <SortBy />
          <BrandFilter
            productList={productList}
            onBrandFilter={handleBrandFilter}
          />
          <ModelFilter
            productList={productList}
            onModelFilter={handleModelFilter}
          />
        </div>

        <div className="products w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 lg:mt-0">
          {isLoading && <p>Loading products...</p>}
          {error && <p>Error loading products: {error}</p>}
          {filteredProductList.length > 0 ? (
            filteredProductList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        <div className="cart w-full lg:w-1/4 mt-6 p-4 lg:mt-0 pl-0 lg:pl-6">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
