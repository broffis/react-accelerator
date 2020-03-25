import React, { Component } from "react";

import axios from '../../../axios-movies';

import Movie from '../../../components/Movie/Movie';
import FullMovie from '../FullMovie/FullMovie';

import './Movies.css';

const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;

class Movies extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&region=us`)
      .then(resp => {
        const movies = resp.data.results
        .filter(movie => movie.release_date > '2020-03-01')
        .sort((a, b) => {
          if (a.release_date > b.release_date) return -1;
          if (b.release_date > a.release_date) return 1;
          return 0;
        })
        this.setState({ movies })
      })
      .catch(err => console.log('error', err))
  }

  movieSelectedHandler = (id) => {
    console.log('movie id', id);
    this.props.history.push({pathname: '/movies/' + id});
  }

  render() {
    let movies = <p className="error-message">Something went wrong</p>
    if (this.state.movies) {
      movies = this.state.movies.map(movie => {
        return (
            <Movie
              key={movie.id}
              movie={movie}
              clicked={() => this.movieSelectedHandler(movie.id)}/>
        )
      })
    }
    return (
      <div className="movies-container">
        { movies }
      </div>
    );
  }
}

export default Movies;