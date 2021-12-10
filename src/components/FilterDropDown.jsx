import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import { StoreContext } from './../ThemeContext'




function FilterDropDown(props) {
    const useStyles = makeStyles((theme) => ({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }));
    const classes = useStyles();


    let { category, movie, changePage, page, totalPage, filterType } = useContext(StoreContext)
    const handleChange = async (event) => {
        filterType[1](event.target.value);
        getDataByFilter(event.target.value, 1)
    };

    async function getDataByFilter(filterType, pageNum) {

        let APIkey = process.env.REACT_APP_APIKEY
        let res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=${filterType}&include_adult=true&include_video=false&page=${pageNum}`)
        movie[1](res.data.results)
        totalPage[1](res.data.total_pages)
        page[1](pageNum)




    }
    return (
        <>
            <div className="filter-by-dropdown">
                <h4>Sort Results By </h4>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={filterType[0]}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"popularity.desc"}>Popularity(Desc)</MenuItem>
                        <MenuItem value={"popularity.asc"}>Popularity(Asc)</MenuItem>
                        <MenuItem value={"release_date.desc"}>Release Day(Desc)</MenuItem>
                        <MenuItem value={"release_date.asc"}>Release Day(Asc)</MenuItem>
                        <MenuItem value={"vote_average.desc"}>Vote(Desc)</MenuItem>
                        <MenuItem value={"vote_average.asc"}>Vote(Asc)</MenuItem>
                        <MenuItem value={"revenue.desc"}>Revenue(Desc)</MenuItem>
                        <MenuItem value={"revenue.asc"}>Revenue(Asc)</MenuItem>


                    </Select>
                </FormControl>
            </div>
        </>
    );
}

export default FilterDropDown;