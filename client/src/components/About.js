import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Tabs, handleTabChange } from './Tabs';
import Header from './Header';
import Page from './Page';

const styles = (theme) => ({
    root: {},
  });

class About extends PureComponent {
    renderHeader = (props) => (
        <Header
          currentView={'view'}
          handleTabChange={handleTabChange}
          tabs={Tabs}
          {...props}
        />
      )
    render() {
        return (
            <>
                {this.renderHeader(this.props)}
                <Page title='About Us'>
                    {
                        <Fragment>
                            <h1>DeeDee Automotive.</h1>
                        </Fragment>
                    }
                </Page>
            </>

        );
    }
}

export default withStyles(styles)(About);
