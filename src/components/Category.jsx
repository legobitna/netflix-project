import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import SingleCategory from './SingleCategory';
import { StoreContext } from './../ThemeContext';
import Loading from './Loading';

export default function Category(props) {

    let { category } = useContext(StoreContext)
    useEffect(() => {
        getCategoryFromAPI()
    }, [])

    async function getCategoryFromAPI() {
        let APIKey = process.env.REACT_APP_APIKEY
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`
        let res = await Axios.get(url)
        let data = res.data
        category[1](data)
    }

    console.log(category[0])
    return <>
    <div className="category-section-wrapper">
    <h2 className="section-title">Genres</h2>
        {
            category[0] === null ? <><Loading></Loading></>
                : <>
                   
                    <ul className="category-section tags">
                        {
                            category[0].genres.map(category => {
                                return (
                                    <>
                                        <SingleCategory genres={category.name}></SingleCategory>
                                    </>
                                )
                            })
                        }
                    </ul>
                </>}
                </div>

                </>
}

