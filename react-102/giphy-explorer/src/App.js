import React, { Component } from 'react';
import './App.css';


import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('5BcMM5haBgjwUgDkXX2u5WelcQnQ6Z8p');
// const fetchGifs = () => gf.trending({ offset: 25, limit: 10 });
// const searchGifs = () => gf.search('letterkenny', { sort: 'relevant', lang: 'es', limit: 10})

class App extends Component {

  // const gf = new GiphyFetch('5BcMM5haBgjwUgDkXX2u5WelcQnQ6Z8p');
  fetchGifs = () => gf.trending({ offset: 25, limit: 10 });
  searchGifs = () => gf.search('letterkenny', { sort: 'relevant', lang: 'es', limit: 10})

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>You'll type your input here:</p>
          {/* <Grid width={800} columns={3} fetchGifs={fetchGifs} /> */}
          <Grid width={800} columns={3} fetchGifs={this.searchGifs} />
        </header>
      </div>
    );
  }
}

export default App;
