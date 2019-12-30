import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        width: '50vw',
    },
    paper: {
        margin: '50px 20px',
        width: '100%',
    },
    formControl: {
        width: '80%',
        height: 500
    }
}));

export default function Settings(props) {

    const handleChange = event => {
        setNet(event.target.value)
    };

    const classes = useStyles();
    const networks = props.networks.networks;
    const [currentNet, setNet] = React.useState('MainNet');
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Paper
                    className={classes.paper}
                    elevation={5}
                >
                    <p>Networks:</p>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-network">Age</InputLabel>
                    <Select
                        labelId="select-network"
                        id="select-network-id"
                        value={currentNet}
                        onChange={handleChange}
                    >
                        {
                            networks !== undefined &&
                            networks.map(option => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    </FormControl>
                </Paper></Grid>
        </Grid>
    )
}