import React from 'react';

import './Movie.css';

const movie = (props) => (
  <div className="movie-poster" onClick={props.clicked}>
    <h2 className="movie-title">{ props.movie.title }</h2>
    <img className="movie-poster-img" alt={`${props.movie.title} poster`} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.movie.poster_path}`} />
    <div className="movie-info">
      <p>Release date: <span className="font-bold">{props.movie.release_date}</span></p>
      <p className="movie-description">{props.movie.overview}</p>
    </div>
  </div>
);

export default movie;