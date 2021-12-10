import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Axios from "axios";
import { StoreContext } from "./../ThemeContext";

class FilterSliderScore extends React.Component {
  static contextType = StoreContext;
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 0, max: 10 },
    };
  }

  FilterByScore = async (value) => {
    
    try {
      let APIkey = process.env.REACT_APP_APIKEY;
    
      let numPage = this.context.page[0];
      let filterType = this.context.filterType[0];
      let currentGenres = this.context.currentGenres[0];
      
      let url = "";
      let result = {};
      if (filterType === null && currentGenres !== null) {
        console.log("filter using category");
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${numPage}&with_genres=${currentGenres}`;
      } else if (filterType !== null) {
        console.log("filter using filterType");
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=${filterType}&include_adult=true&include_video=false&page=${numPage}`;
      } else {
        console.log("in main page");
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${numPage}`;
      }

      result = await Axios.get(url);
      

      let filteredArray = result.data.results.filter(
        (a) =>
          a.vote_average >= this.state.value.min &&
          a.vote_average <= this.state.value.max
      );
   
      this.context.movie[1](filteredArray);

    
    } catch (error) {
    
    }
  };
  render() {
    return (
      <div className="shop-widget">
        <h3 className="shop-title">IBM Score Filter</h3>
        <p>
          From:{" "}
          <span class="price-filer-fromTo-text">{this.state.value.min}</span> -
          To:{" "}
          <span class="price-filer-fromTo-text">{this.state.value.max}</span>
        </p>
        <InputRange
          maxValue={10}
          minValue={0}
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value });
            this.FilterByScore(value);
          }}
        />
        <br></br>
      </div>
    );
  }
}

export default FilterSliderScore;
