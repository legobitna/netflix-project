import React, { useState } from "react";

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [category, setCategory] = useState(null);
  const [movie, setMovie] = useState(null);
  const [originalMovie, setOriginalMovie] = useState(null);
  const [currentGenres, setCurrentGenres] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setToTalPage] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [keyword, setKeyWord] = useState("");
  const [favorite, setFavorite] = useState([]);

  const store = {
    movie: [movie, setMovie],
    originalMovie: [originalMovie, setOriginalMovie],
    category: [category, setCategory],
    page: [currentPage, setCurrentPage],
    totalPage: [totalPage, setToTalPage],
    currentGenres: [currentGenres, setCurrentGenres],
    filterType: [filterType, setFilterType],
    keyword: [keyword, setKeyWord],
    favorite: [favorite, setFavorite],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
