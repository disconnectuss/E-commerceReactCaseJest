import React, { useState, useEffect } from "react";
import SearchIcon from "../assets/icons/SearchIcon";

const BrandFilter = ({ productList, onBrandFilter }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  useEffect(() => {
    const brands = [...new Set(productList.map((product) => product.brand))];
    setAvailableBrands(brands);
  }, [productList]);
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    let updatedBrands;
    if (isChecked) {
      updatedBrands = [...selectedBrands, value];
    } else {
      updatedBrands = selectedBrands.filter((brand) => brand !== value);
    }
    setSelectedBrands(updatedBrands);
    onBrandFilter(updatedBrands);
  };

  return (
    <div className="brands-box p-5 m-5 shadow-md w-[220px] h-auto text-black hidden sm:block">
      <h3 className="text-md mb-2 text-boxTitle">Brands</h3>
      <div className="relative mb-3 bg-white">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-900" />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="search-box w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto text-secondary">
        {availableBrands.length > 0 ? (
          availableBrands.map((brand) => (
            <label key={brand}>
              <input
                type="checkbox"
                value={brand}
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              {brand}
            </label>
          ))
        ) : (
          <p>No brands available</p>
        )}
      </div>
    </div>
  );
};

export default BrandFilter;
