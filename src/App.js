import React, { Component, Fragment } from 'react';
import './App.css';

import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import Search from './SearchQuery';


class App extends Component {
  
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <Search />
        </div>
      </Fragment>
    );
  }
}

export default App;
