import React, {Component} from 'react';

const {clipboard} = require('electron');

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/icons/MarkunreadMailbox';
import CopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';

import {withStyles} from '@material-ui/styles';

const styles = {
    container: {
        padding: '15px',
    },
    header: {
        padding: '15px',
        margin: '15px',
    },
    text: {
        padding: '0 25px',
    },
    iconDiv: {
        padding: 10,
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
                        <Grid item xs={2}>
                            <Icon style={{color: 'black', fontSize: 60}}/>
                        </Grid>
                        <Grid item xs={10} className={classes.text}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Typography variant={'h6'}> My public address:</Typography>
                                    <Typography>{this.props.address}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton  onClick={() => this.copy(address)} aria-label={'copy'}>
                                        <CopyIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Address);
