import React, { useContext } from "react";
import { StoreContext } from "./../ThemeContext";
import Moment from "react-moment";
import {Link} from 'react-router-dom'
import Loading from "./Loading";

export default function SingleMovie({ movie }) {
  let { category } = useContext(StoreContext);
  let categoryList = [];
  if (category[0] !== null) {
    categoryList = category[0].genres;
  }
  function showGen(genresID) {
    categoryList = category[0].genres;
    let genres = genresID.map((id) => {
      let genres = categoryList.find((gen) => gen.id === id);
      return genres.name;
    });
    return genres;
  }
  let getYear = (time) => {
    return time.split("").splice(0, 4).join("");
  };

  return (
    <>
      {category[0] === null ? (
        <>
          <div>
            <Loading></Loading>
          </div>
        </>
      ) : (
        <>
          <Link to={`/movie/${movie.id}`} className="movie_card" id="bright">
            <div className="info_section">
              <div className="movie_header">
                <img
                  className="locandina"
                  src={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
                />
                <h1>{movie.original_title}</h1>
                <h4>
                  <Moment format="YYYY">{movie.release_date}</Moment>
                </h4>
                {/* <span className="minutes">117 min</span> */}
                <ul className="type">
                  {showGen(movie.genre_ids).map((genres) => {
                    return <li>{genres}</li>;
                  })}
                </ul>
              </div>
              <div className="movie_desc">
                <p className="text">{movie.overview}</p>
              </div>
              <div className="movie_social">
                <ul>
                  <li>
                    <i className="fab fa-imdb imb-icon">
                      <span className="imb-score">{movie.vote_average}</span>
                    </i>
                  </li>
                  <li>
                    <i className="fas fa-users users-icon">
                      <span className="imb-score">{movie.popularity}</span>
                    </i>
                  </li>
                  <li>
                    <i className="material-icons">
                      {movie.adult ? (
                        <span className="eightteen">18+</span>
                      ) : (
                        <span className="eightteen">Under 18</span>
                      )}
                    </i>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="blur_back bright_back"
              style={{
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/original//${movie.backdrop_path}` +
                  ")",
              }}
            ></div>
          </Link>
        </>
      )}
    </>
  );
}
