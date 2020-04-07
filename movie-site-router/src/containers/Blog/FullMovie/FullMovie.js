import React, { Component } from 'react';

import axios from '../../../axios-movies';

import './FullMovie.css';

import Aux from '../../../hoc/Aux';

const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;

class FullMovie extends Component {
  state = {
    loadedMovie: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (!this.state.loadedMovie || (this.state.loadedMovie && this.state.loadedMovie.id !== +this.props.match.params.id)) {
        axios.get(`/${this.props.match.params.id}?api_key=${apiKey}&language=en-US`)
          .then(resp => this.setState({ loadedMovie: resp.data }))
          .catch(err => console.log('error with single movie', err))
      }
    }
  }

  render () {
    let moviePost = null;
    if (this.props.match.params.id) {
      moviePost = <p style={{ textAlign: 'center' }}>loading</p>;
    }

    if (this.state.loadedMovie) {
      moviePost = (
        <Aux>
          <h3 className="full-movie-title font-bold">{this.state.loadedMovie.title}</h3>
          <div className="full-movie-content">
            <img className="full-movie-poster" alt={`${this.state.loadedMovie.title} poster`} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${this.state.loadedMovie.poster_path}`} />
            <div className="full-movie-text">
              <p className="full-movie-release-date font-bold">{this.state.loadedMovie.release_date}</p>
              <p className="full-movie-description">{this.state.loadedMovie.overview}</p>
            </div>
          </div>
        </Aux>
      );
    }
    return (
      <div className="full-movie">
        { moviePost }
      </div>
    );
  };
};

export default FullMovie;