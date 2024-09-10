import React from "react";
import { useDispatch } from "react-redux";
import { sortProducts } from "../redux/slices/productSlice";

const SortBy = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    dispatch(sortProducts(selectedSort));
  };

  return (
    <div className="sortBy-box p-5 m-5 shadow-md w-[220px] h-auto hidden sm:block ">
      <h3 className="text-md mb-2 text-boxTitle">Sort By</h3>
      <div className="flex flex-col space-y-2 bg-white p-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="sort"
            value="old-to-new"
            className="mr-2"
            onChange={handleSortChange}
          />
          Old to new
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="sort"
            value="new-to-old"
            className="mr-2"
            onChange={handleSortChange}
          />
          New to old
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="sort"
            value="high-to-low"
            className="mr-2"
            onChange={handleSortChange}
          />
          Price high to low
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="sort"
            value="low-to-high"
            className="mr-2"
            onChange={handleSortChange}
          />
          Price low to high
        </label>
      </div>
    </div>
  );
};

export default SortBy;
