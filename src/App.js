import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import JobIndex from './module-job/Index';
import Admin from './module-job/Admin';
import Detail from './module-job/Detail';
import CreateJob from './module-job/CreateJob';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/create-job' component={CreateJob}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/job/:jobId' component={Detail}/>
          <Route path='/' component={JobIndex}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
