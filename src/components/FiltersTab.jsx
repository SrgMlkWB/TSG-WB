import React from "react";
import "../css/filtersTab.css";
import getSearchData from "../Shared/data";
import Tag from "./Tag";

function FiltersTab({ onSelect, setSearchQuery, setSearchResults, tags, searchQuery, onSearch }) {
  const getAllFilters = () => {
    const allFilters = [];
    getSearchData().map((data) => {
      if (data.filters) {
        data.filters.map((filter, id) => {
          const filterTag = <Tag key={id} value={filter} onClick={onSelect} />;
          if (allFilters.every((elem) => elem.key !== id.toString())) {
            allFilters.push(filterTag);
          }
        });
      }
    });
    return allFilters;
  };

  return (
    <div className="filtersWrapper">
      {/* Section des filtres */}
      <div className="filtersTab">
        <div className="searchContainer">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearch}
            placeholder="Search..."
            className="searchInput"
          />
        </div>

        <div className="tagContainer">{getAllFilters()}</div>
      </div>
    </div>
  );
}

export default FiltersTab;