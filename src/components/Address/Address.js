import React, {Component} from 'react';

const {clipboard} = require('electron');

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/icons/MarkunreadMailbox';
import CopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';

import Balance from "../Balance/Balance";

import {withStyles} from '@material-ui/styles';

const styles = {
    container: {
        padding: '15px',
    },
    header: {
        padding: '5px',
        margin: '5px',
    },
    iconDiv: {
        padding: '0px',
    },
    icon: {},
};

class Address extends Component {

    copy(address) {
        clipboard.writeText(address);
        this.props.enqueueSnackbar('Copied to clipboard', {
            variant: 'success',
        });
    }

    render() {
        const {classes} = this.props;
        const address = this.props.address;
        return (
            <Paper elevation={5}>
                <Grid item xs={12} className={classes.header}>
                    <Grid container className={classes.container}>

                        <Grid container>
                            <Grid item xs={9}>
                                <Typography><b>My public address:</b> {this.props.address} <IconButton
                                    onClick={() => this.copy(address)} aria-label={'copy'}>
                                    <CopyIcon fontSize={'small'} className={classes.icon}/>
                                </IconButton></Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Balance address={address}/>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Address);
