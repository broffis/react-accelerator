import React, { Component } from 'react';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null,
    }

    componentDidMount() {
      // this.reqInterceptor = axios.interceptors.request.use(req => {
      //   this.setState({ error: null });
      //   return req;
      // })
      // this.resInterceptor = axios.interceptors.response.use(res => res, err => {
      //   this.setState({ error: err });
      //   this.props.history.push('/MovieNotFound');
      // })
      console.log('withErrorHandler mounted');
    }

    // componentWillUnmount() {
    //   axios.interceptors.request.eject(this.reqInterceptor);
    //   axios.interceptors.response.eject(this.resInterceptor);
    //   this.setState({ error: null });
    // }

    // errorConfirmedHandler = () => {
    //   this.setState({ error: null});
    // }

    render () {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
}

export default withErrorHandler;