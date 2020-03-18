import React, { Component } from 'react';

import axios from '../../../axios';
import './Posts.css';

import Post from '../../../components/Post/Post';

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    // console.log('props', this.props)
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })
        this.setState({ error: false })
        this.setState({ posts: updatePosts })
      })
      .catch(error => {
        console.log('error', error);
        // this.setState({ error: true })
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  render () {
    let posts = <p style={{ textAlign: 'center'}}>Something went wrong!</p> 
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Post
        title={post.title}
        key={post.id}
        author={post.author}
        match={this.props.match}
        clicked={() => this.postSelectedHandler(post.id)}/>
      });
    }
    return (
      <section className="Posts">
        {posts}
      </section>
    );
  }
}

export default Posts;