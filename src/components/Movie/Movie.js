import React from 'react';
import './Movie.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Movie({movie}) {


    const openInMIDB = () => {
        window.open(`https://www.imdb.com/title/${movie.imdbID}`);
    };

    //TODO: handle broken poster urls...
    const placeholder = <div className="placeholder">N/A</div>;
    const poster = movie.Poster !== "N/A" ? <LazyLoadImage className="poster" src={movie.Poster} alt={movie.Title} effect="blur" /> : placeholder;

    return (
        <div className="movieContainer" onClick={openInMIDB}>
            {poster}
            <h3 className="title">{movie.Title}</h3>
            <h4>{`(${movie.Year})`}</h4>
        </div>
    );
}