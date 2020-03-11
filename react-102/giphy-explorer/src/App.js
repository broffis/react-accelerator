import React, { Component } from 'react';
import './App.css';


import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

import axios from 'axios';

const gf = new GiphyFetch('5BcMM5haBgjwUgDkXX2u5WelcQnQ6Z8p');
// const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
console.log('apiKey', process.env.REACT_APP_GIPHY_API_KEY);
const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
// const fetchGifs = () => gf.trending({ offset: 25, limit: 10 });
// const searchGifs = () => gf.search('letterkenny', { sort: 'relevant', lang: 'es', limit: 10})

class App extends Component {
  state = {
    searchParam: '',
    selectedGiphyId: null,
  }

  // const gf = new GiphyFetch('5BcMM5haBgjwUgDkXX2u5WelcQnQ6Z8p');
  fetchGifs = () => gf.trending({ offset: 25, limit: 10 });
  searchGifs = () => gf.search('letterkenny', { sort: 'relevant', lang: 'es', limit: 10})

  pullGifData = (searchQuery) => {
    // if (!searchQuery) {
    //   return false
    // }

    // this.setState({searchParam: searchQuery });

    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=5BcMM5haBgjwUgDkXX2u5WelcQnQ6Z8p&q=letterkenny&limit=10&offset=0&rating=G&lang=en`)
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=letterkenny&limit=10&offset=0&rating=G&lang=en`)

  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>You'll type your input here:</p>
          {/* <Grid width={800} columns={3} fetchGifs={fetchGifs} /> */}
          <Grid width={800} columns={3} fetchGifs={this.searchGifs} />
          <button onClick={this.pullGifData}>Click me for gif data</button>
        </header>
      </div>
    );
  }
}

export default App;
