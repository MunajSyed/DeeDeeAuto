import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  uniqBy,
} from 'lodash';

//import Cohorts from './cohort/Cohorts';
import { Tabs, handleTabChange } from './Tabs';
import Header from './Header';
import Page from './Page';
import About from './About';

const styles = (theme) => ({
  root: {},
});

class Dashboard extends Component {
  state = {
    cohorts: [],
    cohortsById: {},
  };

  onFetchCohorts = (cohorts) => {
    const cohortsById = cohorts.reduce((acc, cohort) => {
      const { _id } = cohort;
      return Object.assign({}, acc, { [_id]: cohort });
    }, {});

    const currentCohorts = this.state.cohorts;
    const nextCohorts = uniqBy([...currentCohorts, ...cohorts], '_id');

    const currentCohortsById = this.state.cohortsById;
    const nextCohortsById = Object.assign({}, currentCohortsById, cohortsById);

    this.setState({
      cohorts: nextCohorts,
      cohortsById: nextCohortsById,
    });
  }

  renderHeader = (props) => (
    <Header
      currentView={'view'}
      handleTabChange={handleTabChange}
      tabs={Tabs}
      {...props}
    />
  )

  render () {
    return (
      <>
        {this.renderHeader(this.props)}
        <Page title='Cars'>
          {
            /*<Cohorts
            cohorts={this.state.cohorts}
            onFetchCohorts={this.onFetchCohorts}
          />*/} 
        </Page>
      </>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default withStyles(styles)(Dashboard);