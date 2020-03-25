import React from 'react';

import './Movie.css';

const movie = (props) => (
  <div className="movie-poster" onClick={props.clicked}>
    <h2 className="movie-title">{ props.movie.title }</h2>
    <div className="movie-info">
      <div>
        <p>Release date: <span className="font-bold">{props.movie.release_date}</span></p>
        <div>
          <p className="movie-description">{props.movie.overview}</p>
        </div>
      </div>
    </div>
  </div>
);

export default movie;