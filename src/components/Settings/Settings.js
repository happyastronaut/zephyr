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
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    paper: {
        margin: '50px 20px',
        width: '100%'
    },
    formControl: {
        width: '100%',
        height: 500
    }
}));

export default function Settings(props) {

    const handleChange = event => {

    };

    const classes = useStyles();
    const networks = props.networks;
    const [currentNet, setNet] = React.useState('');
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Paper
                    className={classes.paper}
                    elevation={5}
                >
                    <p>Networks:</p>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentNet}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </FormControl>
                    {console.log(networks)}
                </Paper></Grid>
        </Grid>
    )
}