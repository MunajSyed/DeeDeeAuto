import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header'

 export class Home extends Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <Header/>
          </div>
        </div>       
      </div>
    );
  }
}

export default Home;
