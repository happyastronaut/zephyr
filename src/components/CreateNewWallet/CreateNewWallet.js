import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/styles';


const styles = {
    form: {
        padding: 20,
        margin: 100,
        width: 500,
        //height: 350,
    },
    title: {
        padding: '0 0 20px 0',
    },
    inputDiv: {
        padding: '0 0 15px 0',
    },
    input: {
        width: '100%',
        margin: '0 0 15px 0',
    },
    button: {
        width: '100%',
    },
};

class CreateNewWallet extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            confirmPassword: '',
        };
    }

    checkPasswords() {
        if (this.state.name.length < 1) {
            console.log('length err');
            return;
        }
        if (this.state.password.length < 6) {
            console.log('Password must be longer then 6 symbols');
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            console.log('Passwords must match');
            return;
        }
        this.props.createConfirmedWallet(this.state.name, this.state.password);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container={true}
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <Grid>
                        <Paper className={classes.form} elevation={5}>
                            <div>

                                <Typography
                                    className={classes.title}
                                    variant="h5"
                                >
                                    Create new wallet
                                </Typography>
                                <Typography
                                    className={classes.title}
                                    variant="h5"
                                    onClick={() => this.props.onBackClick()}
                                >
                                    Back
                                </Typography>
                            </div>
                            <div className={classes.inputDiv}>
                                <TextField
                                    className={classes.input}
                                    label="Wallet's name"
                                    variant="outlined"
                                    type={'text'}
                                    onChange={e => this.setState({name: e.target.value})}
                                />
                            </div>
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
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(CreateNewWallet);

