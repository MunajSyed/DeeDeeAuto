/*import React, { Component } from 'react';
import logo from './deedeelogo.png';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />  
        </div>

      </div>


    );
  }
}

export default App;*/
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { getToken, removeToken } from '../services/tokenService';

import Login from './Login';
import About from './About';
import Dashboard from './Dashboard';
import Contact from './Contact';

class App extends Component {
  state = {
    user: null,
  };

  fetchUser = async () => {
    const token = getToken();

    if (token) {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const { data } = await response.json();
        const [user] = data;
        this.setState({ user });
        console.log(token)
      } catch (e) {
        console.error('error:', e);
      }
    }
  }

  componentDidMount() {
    console.group('App::componentDidMount');
    this.fetchUser();
    console.groupEnd();
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route
            exact path='/'
            render={(renderProps) => (
              (<Redirect to='/cars' />)
              )}
          />
          <Route
            exact path='/login'
            render={(renderProps) => (
              //(this.state.user)
               // ? (<Redirect to='/cars' />)
                 (<Login fetchUser={this.fetchUser} />)
            )}
          />
          <Route
            exact path='/cars'
            render={(renderProps) => (
                (<Dashboard {...renderProps} />)
            )}
          />
          <Route
            exact path='/about'
            render={(renderProps) => (
               (<About {...renderProps} />)
            )}
          />
          <Route
            exact path='/contact'
            render={(renderProps) => (
             // (this.state.user)
                 (<Contact {...renderProps} />)
                //: (<Redirect to='/login' />)
            )}
          />
          <Route
            exact path='/logout'
            render={() => (
               (removeToken())
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
