import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Address from "../Address/Address";
import Chart from "../Chart/Chart";

const useStyles = makeStyles(theme => ({
    container: {},
    address: {},
    chart: {
        // padding: '15px 0px',
    },
}));

export default function (props) {
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Address
                    enqueueSnackbar={props.enqueueSnackbar}
                    address={props.address}
                />
            </Grid>
            <Grid item className={classes.chart} xs={12}>
                <Chart/>
            </Grid>
        </Grid>
    )
}