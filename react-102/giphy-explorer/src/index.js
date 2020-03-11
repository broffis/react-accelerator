import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('5BcMM5haBgjwUgDkXX2u5WelcQnQ6Z8p');
const fetchGifs = () => gf.trending({ offset: 25, limit: 10 });
const searchGifs = () => gf.search('letterkenny', { sort: 'relevant', lang: 'es', limit: 10})



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
