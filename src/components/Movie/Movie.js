import React, { useMemo, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Movie.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Movie({movie}) {


    const openInMIDB = () => {
        window.open(`https://www.imdb.com/title/${movie.imdbID}`);
    };

    //TODO: better handle broken poster links...
    const placeholder = <div className="poster"></div>;
    const poster = movie.Poster !== "N/A" ? <LazyLoadImage className="poster" src={movie.Poster} alt={movie.Title} effect="blur" placeholder={placeholder} /> : placeholder;

    return (
        <div className="movieContainer" onClick={openInMIDB}>
            {poster}
            <h3 className="title">{movie.Title}</h3>
            <h4>{`(${movie.Year})`}</h4>
        </div>
    );
}