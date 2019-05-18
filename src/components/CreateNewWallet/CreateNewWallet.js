import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BackIcon from '@material-ui/icons/KeyboardBackspace';

import {withStyles} from '@material-ui/styles';

const styles = {
    form: {
        padding: 20,
        margin: 100,
        width: 500,
        //height: 350,
    },
    titleRow: {
        padding: '0 0 10px 0',
    },
    title: {
        padding: '7px 0 0 0',
    },
    inputDiv: {
        padding: '0 0 8px 0',
    },
    input: {
        width: '100%',
        margin: '0 0 8px 0',
    },
    button: {
        width: '100%',
    },
    backButton: {
        margin: '0 0 0 175px',
    },
};

class CreateNewWallet extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            privateKey: undefined,
            password: '',
            confirmPassword: '',
        };
    }

    checkPasswords() {
        if (this.state.name.length < 1) {
            this.props.enqueueSnackbar('Name must not be empty', {
                variant: 'error',
            });
            console.log('length err');
            return;
        }
        if (this.props.mtype === 1 && this.state.privateKey === undefined) {
            this.props.enqueueSnackbar('Wrong private key', {
                variant: 'error',
            });
            console.log('Wrong private key');
            return;
        }
        if (this.state.password.length < 6) {
            this.props.enqueueSnackbar('Password must be longer than 6 symbols', {
                variant: 'error',
            });
            console.log('Password must be longer than 6 symbols');
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.props.enqueueSnackbar('Passwords must match', {
                variant: 'error',
            });
            console.log('Passwords must match');
            return;
        }
        this.props.createConfirmedWallet(this.state.name, this.state.password, this.state.privateKey);
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Paper className={classes.form} elevation={5}>
                    <Grid container className={classes.titleRow}>
                        <Grid item xs>
                            <Typography
                                className={classes.title}
                                variant="h6"
                                color={"primary"}
                            >
                                {
                                    this.props.mtype === 0 && 'Create new wallet' || this.props.mtype === 1 && 'Import wallet'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.backButton}>
                                <IconButton
                                    component="span"
                                    color="primary"
                                    onClick={() => this.props.onBackClick()}
                                >
                                    <BackIcon/>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>

                    <div className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Wallet's name"
                            variant="outlined"
                            type={'text'}
                            onChange={e => this.setState({name: e.target.value})}
                        />
                    </div>
                    {
                        this.props.mtype === 1 &&
                        <div className={classes.inputDiv}>
                            <TextField
                                className={classes.input}
                                label="Private Key"
                                variant="outlined"
                                type={'password'}
                                onChange={e => this.setState({privateKey: e.target.value})}
                            />
                        </div>
                    }
                    <div className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Password"
                            variant="outlined"
                            type={'password'}
                            onChange={e => this.setState({password: e.target.value})}
                        />
                    </div>
                    <div className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Confirm password"
                            variant="outlined"
                            type={'password'}
                            onChange={e => this.setState({confirmPassword: e.target.value})}
                        />
                    </div>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={() => this.checkPasswords()}
                    >
                        Create new Ethereum wallet
                    </Button>

                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(CreateNewWallet);

