import React, { Component, Fragment } from 'react';
import './App.css';

import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import SearchQuery from './SearchQuery';


class App extends Component {
  
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <SearchQuery />
        </div>
      </Fragment>
    );
  }
}

export default App;