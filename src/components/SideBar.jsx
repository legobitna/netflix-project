import React from "react";
import ReactDOM from "react-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import SortSection from "./SortSection";
import FilterSection from './FilterSection'

export default function SideBar() {
  let [value, setValue] = React.useState({ min: 2, max: 10 });

  return (
    <div className="sidebar">
      <div className="year-filter">
        <SortSection style={{marginBottom:"30px"}}></SortSection>
        <FilterSection></FilterSection>
       
      </div>
    </div>
  );
}
