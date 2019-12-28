import React, {Component} from 'react';

const {clipboard} = require('electron');

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/icons/MarkunreadMailbox';
import CopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';

import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import Balance from "../Balance/Balance";


const useStyles = makeStyles(theme => ({
    root: {
        background: 'red'
    },
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
}));

export default function Address(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function copy(address) {
        clipboard.writeText(address);
        setOpen(true);
    }

    const address = props.address;
    return (
        <div>
            <Paper elevation={5}>
                <Grid item xs={12} className={classes.header}>
                    <Grid container className={classes.container}>
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography><b>My public address:</b> {address} <IconButton
                                    onClick={() => {
                                        copy(address);
                                    }} aria-label={'copy'}>
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                variant="success"
                ContentProps={{
                    'aria-describedby': 'message-id',
                    classes: {
                        root: classes.root
                    }
                }}

                message={<span id="message-id">Note archived</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                        UNDO
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        </div>


    )
};
