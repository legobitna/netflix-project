import React, { Fragment, useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleMovie from "./SingleMovie";
import { StoreContext } from "./../ThemeContext";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import FilterDropDown from "./FilterDropDown";
import Loading from "./Loading";

function Favorite() {
  let {
    movie,
    page,
    totalPage,
    changePage,
    currentGenres,
    filterType,
    originalMovie,
    favorite
  } = useContext(StoreContext);

  useEffect(() => {
    
   
    return () => {};
  }, []);

  
  

  return (
    <Fragment>
      <div class="movie-section-wrapper">
        {favorite[0] === null ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            {/* <div className="Pagination">
              

              <Pagination
                currentPage={page[0]}
                totalPages={totalPage[0]}
                changeCurrentPage={changePage}
                theme="square-fill"
              />
            </div> */}
             <h1 style={{color:"white"}}>upcoming Feature</h1>
            <div className="movie-section">
              {favorite[0].map((movie) => {
                return <SingleMovie movie={movie} key={movie.id}></SingleMovie>;
              })}
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default Favorite;
