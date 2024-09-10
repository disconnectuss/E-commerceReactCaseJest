import React, { useState, useEffect } from "react";
import SearchIcon from "../assets/icons/SearchIcon";

const ModelFilter = ({ productList, onModelFilter }) => {
  const [selectedModels, setSelectedModels] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    const models = [...new Set(productList.map((product) => product.model))];
    setAvailableModels(models);
  }, [productList]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    let updatedModels;
    if (isChecked) {
      updatedModels = [...selectedModels, value];
    } else {
      updatedModels = selectedModels.filter((model) => model !== value);
    }

    setSelectedModels(updatedModels);
    onModelFilter(updatedModels);
  };

  return (
    <div className="brands-box p-5 m-5 shadow-md w-[220px] h-auto text-black hidden sm:block">
      <h3 className="text-md mb-2 text-boxTitle">Model</h3>
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
        {availableModels.length > 0 ? (
          availableModels.map((model) => (
            <label key={model} className="block sm:inline">
              <input
                type="checkbox"
                value={model}
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              {model}
            </label>
          ))
        ) : (
          <p>No models available</p>
        )}
      </div>
    </div>
  );
};

export default ModelFilter;
