import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
} from '@material-ui/core';

const styles = (theme) => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    inline: {
        display: 'inline',
        textAlign: 'left'
    },
});

class Cars extends PureComponent {
    handleFetchCars = async () => {
        console.group('Cohorts::handleFetchCohorts');
        try {
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
            <List container spacing={80}>
                {
                    cars.map((car) => {
                        console.log(cars)
                        return (
                            <ListItem
                            >
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography variant='h4'>
                                            <img src={car.image} alt="Logo" width={200} />

                                        </Typography>
                                    }
                                />
                                <ListItemText
                                    disableTypography
                                    secondary={
                                        <React.Fragment>
                                            <Typography variant='h4'>
                                            <p>{`${car.make + " " + car.model + " " + car.year}`}</p>
                                            </Typography>
                                            <Typography component='span' className={classes.inline}>
                                                <p>{`${"Kilometers: " +car.km}`}</p>
                                                <p>{`${"Color: " +car.color}`}</p>
                                                <p>{`${"Transmission: " +car.transmission}`}</p>
                                                <p>{`${"Gear Box: " +car.gearBox}`}</p>
                                                <p>{`${"Condition: " +car.condition}`}</p>
                                                <p>{`${"Body Type: " +car.bodyType}`}</p>

                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Typography variant='h4'>
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