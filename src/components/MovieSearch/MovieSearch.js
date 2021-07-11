import React, { useMemo, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import useModb from '../../api/useModb';
import Movie from '../Movie/Movie';
import './MovieSearch.css';

export default function MovieSearch() {

    const {movies, totalResults, isLoading, error, searchMovies} = useModb();
    const [searchText, setSearchText]  = useState("");
    const [year, setYear] = useState("");
    const [page, setPage] = useState(1);

    const FIRST_YEAR = 1920;
    const movieYears = useMemo(() => Array.from({ length: new Date().getFullYear() - (FIRST_YEAR - 1)}, (_, i) => i + FIRST_YEAR));

    //TODO: add paging and allow user to select page size and fetch data accordingly
    //TODO: allow data sorting

    const doSearch = useCallback((e) => {
        e.preventDefault();

        searchMovies(searchText, year);
    });

    return (
        <div className="movieSearchContainer">
            <form>
                <div className="searchForm">
                    <label>Movie Title:</label>
                    <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />

                    <label>Movie Year:</label>
                    <select value={year} onChange={(e)=>setYear(e.target.value)}>
                        <option value="" >All Years</option>
                        {movieYears.map(year => <option key={year} value={year} >{year}</option>)}
                    </select>
                    <button onClick={doSearch}>Search</button>
                </div>
            </form>

            <div className="resultsContainer">
                {isLoading && <h2 className="loading">Loading...</h2>}
                {error && <h2 className="error">{error}</h2>}
                {movies.length > 0 && movies.map((movie,i) => 
                    <Movie key={`${movie.imdbID}_${i}`} movie={movie} />
                )}
            </div>
        </div>
    );

}