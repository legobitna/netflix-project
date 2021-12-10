import React, { useContext } from 'react';
import { StoreContext } from './../ThemeContext'
import axios from 'axios'



function SingleCategory({ genres }) {


    let { category, movie, changePage, page, totalPage,currentGenres,filterType} = useContext(StoreContext)
    async function getDataByCategory(genres, pageNum) {
        let genresResult = category[0].genres.find(elm => elm.name === genres).id
        let APIkey = process.env.REACT_APP_APIKEY
        let res = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US&page=${pageNum}&with_genres=${genresResult}`)
        movie[1](res.data.results)
        totalPage[1](res.data.total_pages)
        page[1](pageNum)
        currentGenres[1](genresResult)
        filterType[1](null)



    }

    return (
        <li onClick={() => getDataByCategory(genres, 1)} className="genres-btn">{genres}</li>
    );
}

export default SingleCategory;