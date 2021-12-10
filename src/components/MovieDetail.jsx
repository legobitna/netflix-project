import React from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreContext } from "./../ThemeContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import SingleMovie from "./SingleMovie";
import SingleCardSlider from "./SingleCardSlider";
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube'

export default function MovieDetail({ match }) {
  const [movieDetails, setMovieDetails] = React.useState(null);
  const [movieReview, setMovieReview] = React.useState(null);
  const [movieRelated, setMovieRelated] = React.useState(null);
  const [reviewActive, setReviewActive] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false)

  let { movie, favorite } = React.useContext(StoreContext);

  const [trailer, setTrailer] = React.useState(null)

  React.useEffect(() => {
    getMovieDetailsFromAPI(match.params.id);

    return () => { };
  }, []);

  async function getMovieDetailsFromAPI(id) {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}&language=en-US`;
    let res = await Axios.get(url);
    setMovieDetails(res.data);
    getMovieReviewFromAPI(id);
    getMovieRelatedFromAPI(id);
    getTrailer(id)
    console.log("ID is:", id)
  }
  async function getMovieReviewFromAPI(id) {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${APIkey}&language=en-US&page=1`;
    let res = await Axios.get(url);
    setMovieReview(res.data);
  }
  async function getMovieRelatedFromAPI(id) {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${APIkey}&language=en-US&page=1`;
    let res = await Axios.get(url);
    setMovieRelated(res.data.results);
  }

  async function getTrailer(id) {
    let APIkey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIkey}&language=en-US`
    let res = await Axios.get(url)
    setTrailer(res.data.results[0])
    console.log("Trailer:", res.data.results[0])
  }

  function addToFavorite(movie) {
    favorite[1]([...favorite[0], movie])
    console.log(movie)
  }

  function removeFromFavorite(id) {
    let newArray = [...favorite[0]]
    let index = newArray.findIndex(elm => elm === id)
    console.log(index)
    if (index !== -1) {
      newArray.splice(index, 1);
      favorite[1](newArray)
    }


  }
  function closeModal() {
    setModalOpen(false)
  }

  console.log("related",movieRelated);
  

  return (
    <>
      {movieDetails === null ||
        movieReview === null ||
        movieRelated === null ||
        trailer === null ? (
          <Loading></Loading>
        ) : (
          <>
            {/* breadcrumb-area-start */}
            <section
              className="breadcrumb-area"
              style={{
                backgroundImage:
                  'url("https://images.hdqwalls.com/download/polygonal-abstract-red-dark-background-eo-1280x1024.jpg")',
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="breadcrumb-text text-center">
                      <h1 style={{ color: "white" }}>NETFLIX</h1>
                      <ul className="breadcrumb-menu">
                        <li>
                          <Link to="/">home</Link>
                        </li>
                        <li>
                          <span>{movieDetails.title}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* breadcrumb-area-end */}
            {/* shop-area start */}
            <section className="shop-details-area pt-100 pb-100">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-4">
                    <div className="product-details-img mb-10">
                      <div className="tab-content" id="myTabContentpro">
                        <div
                          className="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                        >
                          <div className="product-large-img">
                            <img
                              src={`https://image.tmdb.org/t/p/original//${movieDetails.poster_path}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                        >
                          <div className="product-large-img">
                            <img src="img/product/pro2.jpg" alt="" />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="profile1"
                          role="tabpanel"
                        >
                          <div className="product-large-img">
                            <img src="img/product/pro3.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shop-thumb-tab mb-30">
                      <ul className="nav" id="myTab2" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-selected="true"
                          >
                            <img src="img/product/pro1.jpg" alt="" />{" "}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-selected="false"
                          >
                            <img src="img/product/pro2.jpg" alt="" />
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="profile-tab2"
                            data-toggle="tab"
                            href="#profile1"
                            role="tab"
                            aria-selected="false"
                          >
                            <img src="img/product/pro3.jpg" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8">
                    <div className="product-details mb-30 pl-30">
                      <div className="details-cat mb-20">
                        <ul className="movie-details-genres">
                          {movieDetails.genres.map((genres) => {
                            return <li>{genres.name}</li>;
                          })}
                        </ul>
                      </div>
                      <h1 className="pro-details-title mb-15">
                        {movieDetails.original_title}
                      </h1>
                      <h3 className="pro-details-tagline mb-15">
                        {movieDetails.tagline}
                      </h3>
                      <div className="movie_social_details">
                        <ul>
                          <li>
                            <i className="fab fa-imdb imb-icon">
                              <span className="imb-score">
                                {movieDetails.vote_average}
                              </span>
                            </i>
                          </li>
                          <li>
                            <i className="fas fa-users users-icon">
                              <span className="imb-score">
                                {movieDetails.popularity}
                              </span>
                            </i>
                          </li>
                          <li>
                            <i className="material-icons">
                              {movieDetails.adult ? (
                                <span className="eightteen">18+</span>
                              ) : (
                                  <span className="eightteen">Under 18</span>
                                )}
                            </i>
                          </li>
                        </ul>
                      </div>
                      <div className="product-variant">
                        <div className="product-desc variant-item">
                          <p>{movieDetails.overview}</p>
                        </div>
                        <div className="product-info-list variant-item">
                          <ul>
                            <li>
                              <span>Budget</span> ${movieDetails.budget}
                            </li>
                            <li>
                              <span>Revenue</span> ${movieDetails.revenue}
                            </li>
                            <li>
                              <span>Release Day</span> {movieDetails.release_date}
                            </li>
                            <li>
                              <span>Time</span> {movieDetails.runtime}
                            </li>
                          </ul>
                        </div>
                        <div className="product-action-details variant-item">

                          <button class="btn theme-btn" id="model-btn-open" onClick={() => setModalOpen(true)}><i class="fas fa-film"></i> Watch Trailer</button>

                          <div className="product-details-action">

                            <button
                              className="details-action-icon"

                            >

                              {
                                favorite[0].find(elm => elm === movieDetails.id)
                                  ? <i onClick={() => removeFromFavorite(movieDetails.id)} className="fas fa-heart" /> : <i onClick={() => addToFavorite(movieDetails)} className="fas fa-heart black" />
                              }
                            </button>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                  <ReactModal isOpen={modalOpen} style={{content: {backgroundColor:'#000'}}}>
                    <i class="fas fa-times fa-2x" style={{color:"#fe4536"}} onClick={() => closeModal()}></i>
                    <div className="trailer">
                      <YouTube 
                        video={trailer.key}
                        autoplay
                        width="100%"
                        height="100%"
                      />
                    </div>
                  </ReactModal>





                <div className="row mt-50">
                  <div className="col-xl-12 col-lg-12">
                    <div className="product-review">
                      <ul
                        className="nav review-tab"
                        id="myTabproduct"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <button
                            onClick={() => setReviewActive(!reviewActive)}
                            className={
                              reviewActive ? "nav-link active" : "nav-link"
                            }
                          
                            data-toggle="tab"
                           
                            role="tab"
                           
                          >
                            Reviews ({movieReview.results.length})
                        </button>
                        </li>
                        <li className="nav-item">
                          <button
                            onClick={() => setReviewActive(!reviewActive)}
                            className={
                              reviewActive ? "nav-link" : "nav-link active"
                            }
                            
                            data-toggle="tab"
                          
                            role="tab"
                           
                          >
                            Related Movies ({movieRelated.length})
                        </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent2">
                        <div
                          className={
                            reviewActive
                              ? "tab-pane show active"
                              : "tab-pane fade"
                          }
                          id="profile6"
                          role="tabpanel"
                          aria-labelledby="profile-tab6"
                        >
                          <div className="desc-text review-text">
                            <div className="product-commnets">
                              {movieReview.results.map((review) => {
                                return (
                                  <div className="product-commnets-list mb-25 pb-15">
                                    <div className="pro-comments-img">
                                      <img
                                        src="img/product/comments/02.png"
                                        alt=""
                                      />
                                    </div>
                                    <div className="pro-commnets-text">
                                      <h4>{review.author}</h4>

                                      <p>{review.content}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            
                          </div>
                        </div>
                        <div
                          className={
                            reviewActive
                              ? "tab-pane fade "
                              : "tab-pane show active"
                          }
                          id="profile6"
                          role="tabpanel"
                          aria-labelledby="profile-tab6"
                        >
                          <div className="related-movies">
                            {movieRelated.map((movie) => {
                              return (
                                <SingleCardSlider
                                  movie={movie}
                                ></SingleCardSlider>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <div className="pro-details-banner">
                      <a href="shop.html">
                        <img src="img/banner/pro-details.jpg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* shop-area end */}
          </>
        )}
    </>
  );
}
