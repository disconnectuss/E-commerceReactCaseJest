import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../assets/icons/cartIcon";
import UserIcon from "../assets/icons/UserIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import { selectCart } from "../redux/slices/cartSlice";
import { fetchProducts } from "../redux/slices/productSlice";

const Header = () => {
  const { items } = useSelector(selectCart);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[1].value;

    dispatch(fetchProducts({ text }));
  };

  return (
    <div className="header-container flex justify-between items-center h-[50px] px-6 text-white bg-primary z-50">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">Eteration</h1>

        <form
          data-testid="search-form"
          onSubmit={handleSubmit}
          className="relative hidden sm:block"
        >
          <button
            role="button"
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </button>
          <input
            type="text"
            className="search-box pl-10 pr-3 py-1 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search"
          />
        </form>
      </div>

      <div className="flex items-center gap-8">
        <div className="total-price flex gap-2 items-center">
          <CartIcon />
          <span className="font-medium">{totalPrice.toLocaleString()} ₺</span>
        </div>

        <div className="user flex gap-2 items-center">
          <UserIcon />
          <span className="font-medium">Kerem</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
