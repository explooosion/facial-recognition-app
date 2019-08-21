import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';

import Home from './routes/Home';
import ImageInput from './routes/ImageInput';
import VideoInput from './routes/VideoInput';
import Train from './routes/Train';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter history={createBrowserHistory({ basename: process.env.PUBLIC_URL })}>
          <div className="route">
            <Route exact path="/" component={Home} />
            <Route exact path="/photo" component={ImageInput} />
            <Route exact path="/camera" component={VideoInput} />
            <Route exact path="/train" component={Train} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
