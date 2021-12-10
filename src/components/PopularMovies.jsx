import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import SingleCardSlider from "./SingleCardSlider";
import Loading from "./Loading";
import _debounce from "lodash.debounce";

export default function PopularMovies() {
  const [topMovie, setTopMovie] = React.useState(null);

  let data = [];
  React.useEffect(() => {
    getTopMovieAPI();

    const handleResize=()=> {
      calculateSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getTopMovieAPI() {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`;
    let res = await Axios.get(url);

    data = res.data;
    calculateSize(window.innerWidth);
  }
  const calculateSize = (width) => {
    let size = 5;
    if (width < 500) {
      size = 1;
    } else if (width < 700) {
      size = 2;
    }else if(width<1250){
      size=3
    }
    let arrayOfArrays = [];
    for (let i = 0; i < data.results.length; i += size) {
      arrayOfArrays.push(data.results.slice(i, i + size));
    }
    setTopMovie(arrayOfArrays);
  };

  return (
    <>
      {topMovie === null ? (
        <Loading></Loading>
      ) : (
        <>
          <h1 className="title">Top Popular Movies</h1>
          <Carousel>
            {topMovie.map((array) => {
              return (
                <Carousel.Item>
                  <div className="each-slider">
                    {array.map((movie) => {
                      return (
                        <SingleCardSlider movie={movie}></SingleCardSlider>
                      );
                    })}
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
}
