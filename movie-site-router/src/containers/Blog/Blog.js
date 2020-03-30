import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Movies from './Movies/Movies';

import './Blog.css';

class Blog extends Component {

  render() {
    return (
      <div className="blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  className="nav-item"
                  to="/movies">Home</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/MovieNotFound" render={() => <h1>Movie not found</h1>} />
          <Route path="/movies" component={Movies} />
          <Route path="/" exact component={Movies} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  };
}

export default Blog;