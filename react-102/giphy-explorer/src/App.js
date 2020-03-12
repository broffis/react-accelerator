import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


import Giphy from './components/GiphyDisplay';
import SearchInput from './components/SearchInput';

const apiKey = process.env.REACT_APP_GIPHY_API_KEY;

class App extends Component {
  state = {
    selectedGiphyId: null,
    giphys: [],
    searchValue: '',
  }

  inputChangedHandler = (input) => {
    this.setState({ searchValue: input })
  }

  pullGifData = async () => {
    if (!this.state.searchValue) {
      const results = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=G`)
      const { data } = results;
      this.setState({ giphys: data.data })
      return false;
    }

    axios.get(`https://api.giphy.com/v1/gifs/search?q=${this.state.searchValue}&api_key=${apiKey}&limit=10&offset=0&rating=G&lang=en`)
      .then(response => {
        const { data } = response;
        this.setState({ giphys: data.data })
      })
  }

  render () {
    let gifs = this.state.giphys.map(gif => {
        return <Giphy id={gif.id} title={gif.title} />;
      });
    return (
      <div className="App">
        <header className="App-header">
          <fieldset>
            <legend>Gif Search</legend>
            <SearchInput 
              id='searchText'
              label='Search'
              type='text'
              defaultValue={this.state.searchValue}
              changed={this.inputChangedHandler}/>
          </fieldset>
          <button onClick={this.pullGifData}>Click me for gif data</button>
        </header>
        { gifs }
      </div>
    );
  }
}

export default App;
