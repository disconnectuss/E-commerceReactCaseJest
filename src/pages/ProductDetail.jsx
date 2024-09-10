import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../components/Cart";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice"; // Assuming this is your thunk to fetch products

const ProductDetail = () => {
  const { id } = useParams(); // Get product id from URL params
  const dispatch = useDispatch();
  const { productList, isLoading, error } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  // Fetch products if productList is empty
  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productList.length]);

  // Find product in productList once it's available
  useEffect(() => {
    console.log("Product List:", productList); // Debug: check if productList is populated
    console.log("Product ID from Params:", id); // Debug: check the id from params

    if (productList.length > 0) {
      const foundProduct = productList.find(
        (item) => item.id === parseInt(id) // Ensure id comparison
      );
      console.log("Found Product:", foundProduct); // Debug: log the found product
      setProduct(foundProduct);
    }
  }, [id, productList]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="flex sm:flex-col flex-row w-3/4 gap-3 mx-auto">
      <div className="flex flex-col sm:flex-col md:flex-row max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
        <div className="w-full md:w-1/2 bg-gray-300 h-64 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between pl-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>
            <p className="text-blue-600 text-xl font-semibold mb-4">
              {product.price}₺
            </p>

            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full mb-4 hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="right w-full md:w-auto">
        <Cart />
      </div>
    </div>
  );
};

export default ProductDetail;
