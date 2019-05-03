import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    Badge,
    Typography,
} from '@material-ui/core';
import {
    Folder as FolderIcon,
    Person as PersonIcon,
} from '@material-ui/icons';

import { getToken } from '../services/tokenService';

const styles = (theme) => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    inline: {
        display: 'inline',
    },
});

class Cars extends PureComponent {
    handleFetchCars = async () => {
        console.group('Cohorts::handleFetchCohorts');
        try {
            const token = getToken();
            const response = await fetch('/api/cars');
            const cars = await response.json();
            console.log('cars:', cars.data);
            this.props.onFetchCars(cars.data);
            console.groupEnd();
        } catch (e) {
            console.error(e);
            console.groupEnd();
        }
    }

    componentDidMount() {
        this.handleFetchCars();
        console.groupEnd();
    }

    componentWillUnmount() {
        console.groupEnd();
    }

    render() {
        const { classes, cars } = this.props;
        return (
            <List>
                {
                    cars.map((car) => {
                        console.log(cars)
                        return (
                            <ListItem
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant='h4'>
                                            {`${car.make + " " + car.model + " " + car.year}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography component='span' className={classes.inline}>
                                                {`${car.km + " km"}`}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                <Typography variant='h6'>
                                                {`${"$" + car.price}`}
                                            </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    }
}

Cars.propTypes = {
    classes: PropTypes.object,
    cars: PropTypes.arrayOf(PropTypes.object),
    onFetchCar: PropTypes.func,
};

export default withStyles(styles)(Cars);