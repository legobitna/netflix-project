import React from "react";
import MovieList from "./MovieList";
import SideBar from "./SideBar";
import Banner from "./Banner";
import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import UpComingMovies from "./UpComingMovies";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <div className="my-container">
        <PopularMovies></PopularMovies>
        <TopRatedMovies></TopRatedMovies>
        <UpComingMovies></UpComingMovies>
        <div className="movie-sidebar-wrapper" style={{display:"none"}}>
          <SideBar></SideBar>
          
        </div>
      </div>
    </>
  );
}
