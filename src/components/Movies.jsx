import React from "react";
import MovieList from "./MovieList";
import SideBar from "./SideBar";

export default function Movies() {
  return (
    <div>
      <div className="my-container">
        <div className="movie-sidebar-wrapper">
          <SideBar></SideBar>
          <MovieList></MovieList>
        </div>
      </div>
    </div>
  );
}
