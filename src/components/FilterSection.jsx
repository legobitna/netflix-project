import React from "react";
import FilterSliderYear from "./FilterSliderYear";
import FilterSliderScore from "./FilterSliderScore";
import Category from "./Category";

export default function FilterSection() {
  const [close, setClose] = React.useState(false);

  return (
    <>
      <div
        className={close ? "sort-section closed" : "sort-section"}
        onClick={a=>setClose(!close)}
      >
        <div className="name">
          <h2>Filter</h2>
          <span>
            <i class="fas fa-arrow-right"></i>
          </span>
        </div>
        <div className="filter">
        <FilterSliderYear></FilterSliderYear>
        <FilterSliderScore></FilterSliderScore>
        <Category></Category>
        </div>
      </div>
    </>
  );
}
