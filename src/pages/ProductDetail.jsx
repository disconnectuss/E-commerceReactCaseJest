import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../components/Cart";
import { useSelector, useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();

  const { productList } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(productList.find((product) => product.id === id));
  }, [id]);

  return (
    <div className="flex sm:flex-col flex-row w-3/4 gap-3 mx-auto">
      <div className="flex flex-col sm:flex-col md:flex-row max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
        <div className="w-full md:w-1/2 bg-gray-300 h-64 mb-6 md:mb-0">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between pl-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {product?.name}
            </h2>
            <p className="text-blue-600 text-xl font-semibold mb-4">
              {product?.price}₺
            </p>

            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full mb-4 hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>

            <p className="text-gray-600 leading-relaxed">
              {product?.description}
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
