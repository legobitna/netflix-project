import React, { Fragment, useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleMovie from "./SingleMovie";
import { StoreContext } from "./../ThemeContext";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import FilterDropDown from "./FilterDropDown";
import Loading from "./Loading";

function MovieList() {
  let {
    movie,
    page,
    totalPage,
    changePage,
    currentGenres,
    filterType,
    originalMovie,
  } = useContext(StoreContext);

  useEffect(() => {
    getDataFromAPI(1);
    page[1](1)
    return () => {};
  }, []);

  async function getDataFromAPI(numPage) {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = "";

    if (filterType[0] === null && currentGenres[0] !== null) {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${numPage}&with_genres=${currentGenres[0]}`;
    } else if (filterType[0] !== null) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=${filterType[0]}&include_adult=true&include_video=false&page=${numPage}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${numPage}`;
    }

    console.log(filterType[0], "???????????????????");
    console.log(currentGenres[0], "!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(url, "this is URL");
    let res = await axios.get(url);
    movie[1](res.data.results);
    originalMovie[1](res.data.results);
    totalPage[1](res.data.total_pages);
  }
  changePage = (numPage) => {
    page[1](numPage);

    getDataFromAPI(numPage);

    // props.getProductListBySearch(numPage)
    //fetch a data
    //or update a query to get data
  };
  

  return (
    <Fragment>
      <div class="movie-section-wrapper">
        {movie[0] === null ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            <div className="Pagination">
              

              <Pagination
                currentPage={page[0]}
                totalPages={totalPage[0]}
                changeCurrentPage={changePage}
                theme="square-fill"
              />
            </div>

            <div className="movie-section">
              {movie[0].map((movie) => {
                return <SingleMovie movie={movie} key={movie.id}></SingleMovie>;
              })}
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default MovieList;
