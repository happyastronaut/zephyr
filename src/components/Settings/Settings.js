const {clipboard} = require('electron');

import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';

import Address from '../Address/Address';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        width: '50vw',
    },
    paper: {
        margin: '50px 20px',
        width: '100%',
        height: '50vh'
    },
    title: {
        padding: '20px 40px 0 40px',
    },
    formControl: {
        width: '80%',
        padding: '0px 40px 10px 40px',
        'vertical-align': 'middle',
    },
    field: {},
}));

export default function Settings(props) {

    const copy = value => {
        clipboard.writeText(value);
        props.enqueueSnackbar('Copied to clipboard', {
            variant: 'success',
        });
    };

    const handleChange = event => {
        const pick = event.target.value;
        setNet(pick);
        props.switchNetwork(networks.find(x => x.name === pick).url);
    };

    const classes = useStyles();
    const networks = props.networks.networks;
    console.log(networks.find(x => x.url === props.networkUrl).name);
    const [currentNet, setNet] = React.useState(networks.find(x => x.url === props.networkUrl).name);
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Paper
                    className={classes.paper}
                    elevation={5}
                >
                    <Typography
                        variant="h6"
                        color={"primary"}
                        className={classes.title}
                    >
                        Networks:
                    </Typography>
                    <FormControl className={classes.formControl}>

                        <Select
                            className={classes.field}
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
                    <Typography
                        variant="h6"
                        color={"primary"}
                        className={classes.title}
                    >
                        Export wallet Private Key:
                        <IconButton
                            onClick={() => {copy(props.account.privateKey)}} aria-label={'copy'}>
                            <CopyIcon fontSize={'small'} className={classes.icon}/>
                        </IconButton>
                    </Typography>


                </Paper>
            </Grid>
        </Grid>
)
}