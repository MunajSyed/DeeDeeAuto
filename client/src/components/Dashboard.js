import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from '../assets/deedeelogo.png';
import '../assets/App.css';

import {
  uniqBy,
} from 'lodash';

import Cars from './Cars';
import { Tabs, handleTabChange } from './Tabs';
import Header from './Header';
import Page from './Page';
import About from './About';

const styles = (theme) => ({
  root: {},
});

class Dashboard extends Component {
  state = {
    cars: [],
    carsById: {},
    position: 0,
  };
  componentDidMount (){
   setTimeout(()=> this.setState({position: 1}), 3000)
}
  onFetchCars = (cars) => {

    const carsById = cars.reduce((acc, car) => {
      const { _id } = car;

      return Object.assign({}, acc, { [_id]: car });
    }, {});

    const currentCars = this.state.cars;
    const nextCars = uniqBy([...currentCars, ...cars], '_id');

    const currentCarsById = this.state.carsById;
    const nextCarsById = Object.assign({}, currentCarsById, carsById);

    this.setState({
      cars: nextCars,
      carsById: nextCarsById,
    });

  }

  renderHeader = (props) => (
    <Header
      currentView={'view'}
      handleTabChange={handleTabChange}
      tabs={Tabs}
      {...props}
    />
  );


  render () {
    console.log(this.state.position)
    if(this.state.position === 0) {
      return (
        <>
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />  
        </div>

      </div>
        </>
      );
    }
    else{
    return (
      <>
        {this.renderHeader(this.props)}
        <Page>
          {
            <Cars
            cars={this.state.cars}
            onFetchCars={this.onFetchCars}
          />} 
        </Page>
      </>
    );
  }
}
}

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default withStyles(styles)(Dashboard);