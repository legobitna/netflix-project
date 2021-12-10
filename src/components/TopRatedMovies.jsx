import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import SingleCardSlider from "./SingleCardSlider";

export default function TopRatedMovies() {
  const [topMovie, setTopMovie] = React.useState(null);

  React.useEffect(() => {
    getTopRatedMovieAPI();
    return () => {};
  }, []);

  async function getTopRatedMovieAPI() {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en-US&page=1`;
    let res = await Axios.get(url);
    var size = 5;
    var arrayOfArrays = [];
    for (var i = 0; i < res.data.results.length; i += size) {
      arrayOfArrays.push(res.data.results.slice(i, i + size));
    }
    setTopMovie(arrayOfArrays);
  }
  console.log(topMovie);
  return (
    <>
      {topMovie === null ? (
        <div>Loading</div>
      ) : (
        <>
        <h1 className="title">Top Rated Movies</h1>
        <Carousel>
          {topMovie.map((array) => {
            return (
              
                <Carousel.Item>
                  <div className="each-slider">
                  {array.map((movie) => {
                    return <SingleCardSlider movie={movie}></SingleCardSlider>;
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
