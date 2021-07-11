import React, { useMemo, useState,  useEffect, useRef } from 'react';
import useOmdb from '../../api/useOmdb';
import Movie from '../Movie/Movie';
import Pager from '../Pager/Pager';
import './MovieSearch.css';

export default function MovieSearch() {

    const searchInput = useRef(null);
    const {movies, totalResults, isLoading, error, searchMovies} = useOmdb();
    const [searchText, setSearchText]  = useState("");
    const [year, setYear] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const FIRST_YEAR = 1920;
    const movieYears = useMemo(() => Array.from({ length: new Date().getFullYear() - (FIRST_YEAR - 1)}, (_, i) => i + FIRST_YEAR).reverse(), []);

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    useEffect(() => {

        //TODO: allow the user toset the page size and fetch data accordingly:
        const PAGE_SIZE = 10;

        const pageList = Array.from({ length: Math.ceil(totalResults / PAGE_SIZE)}, (_, i) => i + 1);

        setPages(pageList);

    }, [totalResults]);

    useEffect(() => {

        callSearchMovies();

    }, [year, currentPage, sortBy])

    const callSearchMovies = () => {
        if(searchText.trim().length > 0) {
            searchMovies(searchText, year, currentPage, sortBy);
        }
    }

    const resetAndSearch = () => {
        if(currentPage === 1) {
            callSearchMovies();
        }
        else {
            setCurrentPage(1);
        }
    };

    const doSearch = (e) => {
        e.preventDefault();

        resetAndSearch();
        
    };

    const onSearchInputKeyDown = (e) => {
        if(e.key === 'Enter'){

            resetAndSearch();
        }
    };

    const onYearChange = (theYear) => {
        setYear(theYear);
        setCurrentPage(1);
    };

    const navigateToPage = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="movieSearchContainer">
            <form className="searchForm">
                <div>
                    <label>Movie Title:</label>
                    <input type="text" ref={searchInput} value={searchText} onChange={(e)=>setSearchText(e.target.value)} onKeyPress={onSearchInputKeyDown} />

                    <label>Movie Year:</label>                    
                    <select value={year} onChange={(e)=>onYearChange(e.target.value)}>
                        <option value="" >All Years</option>
                        {movieYears.map(year => <option key={year} value={year} >{year}</option>)}
                    </select>
                    <button onClick={doSearch}>Search</button>
                </div>
                <div style={{marginTop: 10}}>
                    <label>Sort By:</label> 
                    <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
                        <option value="">Original</option>
                        <option value="Year">Year</option>
                        <option value="Title">Title</option>
                    </select>
                </div>

                <Pager pages={pages} currentPage={currentPage} onPageSelected={navigateToPage} />
            </form>

            <div className="resultsContainer">
                {isLoading && <h2 className="loading">Loading...</h2>}
                {error && <h2 className="error">{error}</h2>}
                {movies.length > 0 && movies.map((movie,i) => 
                    <Movie key={movie.imdbID} movie={movie} />
                )}
            </div>
        </div>
    );

}