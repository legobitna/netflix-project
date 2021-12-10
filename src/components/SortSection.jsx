import React from "react";
import FilterDropDown from "./FilterDropDown";

export default function SortSection() {
  const [close, setClose] = React.useState(false);

  return (
    <>
      <div
        className={close ? "sort-section closed" : "sort-section"}
      >
        <div className="name">
          <h2>Sort</h2>
          <span>
            <i class="fas fa-arrow-right" onClick={a=>setClose(!close)}></i>
          </span>
        </div>
        <div className="filter">
            <FilterDropDown></FilterDropDown>
        </div>
      </div>
    </>
  );
}
