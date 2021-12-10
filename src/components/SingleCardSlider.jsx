import React from "react";
import { StoreContext } from "./../ThemeContext";
import {Link} from 'react-router-dom'
import Loading from './Loading'

export default function SingleCardSlider({ movie }) {
  let { category } = React.useContext(StoreContext);
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
  return (
    <>
      {category[0] === null ? (
       <Loading></Loading>
      ) : (
        <Link to={`/movie/${movie.id}`}
          className="card"
          style={{
            backgroundImage:
              "url(" +
              `https://image.tmdb.org/t/p/w400//${movie.backdrop_path}` +
              ")",
          }}
        >
          <div className="overlay">
            <div className="items" />
            <div className="items head">
              <p>{movie.title}</p>
              <hr />
            </div>

            <ul className="card-slider-genres">
              {showGen(movie.genre_ids).map((genres) => {
                return <li>{genres}</li>;
              })}
            </ul>

            <div className="movie_social_details" style={{marginLeft:"10px"}}>
                      <ul>
                        <li>
                          <i className="fab fa-imdb imb-icon">
                            <span className="imb-score">
                              {movie.vote_average}
                            </span>
                          </i>
                        </li>
                        <li>
                          <i className="fas fa-users users-icon">
                            <span className="imb-score">
                              {movie.popularity}
                            </span>
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
        </Link>
      )}
    </>
  );
}
