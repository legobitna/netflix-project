import React, { Fragment, useContext } from "react";
import { useEffect } from "react";
import {Row, Col} from "react-bootstrap"
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

   
    let res = await axios.get(url);
    movie[1](res.data.results);
    originalMovie[1](res.data.results);
    totalPage[1](res.data.total_pages);
  }
  changePage = (numPage) => {
    page[1](numPage);

    getDataFromAPI(numPage);

    
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
           

            <div className="movie-section">
              <Row>
                {movie[0].map((movie) => {
                return <Col lg={6}><SingleMovie movie={movie} key={movie.id}></SingleMovie></Col>;
              })}
              </Row>
              
            </div>
            <div className="Pagination">
              

              <Pagination
                currentPage={page[0]}
                totalPages={totalPage[0]}
                changeCurrentPage={changePage}
                theme="square-fill"
              />
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default MovieList;
