import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Tabs, handleTabChange } from './Tabs';
import Header from './Header';
import Page from './Page';

const styles = (theme) => ({
    root: {},
});

class Contact extends PureComponent {
    state = {
        dealers: []
    };
    handleFetchDealers = async () => {
        console.group('Cohorts::handleFetchDealer');
        try {
            const response = await fetch('/api/dealers');
            const d = await response.json();
            this.setState({
                dealers: d.data[0],
            });
            console.groupEnd();
        } catch (e) {
            console.error(e);
            console.groupEnd();
        }
    }

    componentDidMount() {
        this.handleFetchDealers();
        console.groupEnd();
    }

    componentWillUnmount() {
        console.groupEnd();
    }
    renderHeader = (props) => (
        <Header
            currentView={'view'}
            handleTabChange={handleTabChange}
            tabs={Tabs}
            {...props}
        />
    )
    render() {
        console.log('dealers:', this.state.dealers);
        const dealers = this.state.dealers
        return (
            <>
                {this.renderHeader(this.props)}
                <Page title='Contact Us'>
                    {
                        <Fragment>
                            <h1>{dealers.name}</h1>
                            <h4>{"Phone Number: " + dealers.phone}</h4>
                            <h4>{"Email: " + dealers.email}</h4>
                            <h4>{"Location: " + dealers.streetNumber + " " + dealers.streetName + ", " + dealers.city + " " + dealers.province + ", " + dealers.postalCode}</h4>

                        </Fragment>
                    }
                </Page>
            </>

        );
    }
}
export default withStyles(styles)(Contact);
