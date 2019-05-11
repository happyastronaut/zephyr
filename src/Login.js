import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {withStyles} from '@material-ui/styles';

import Main from './main';

import * as accountActions from './ethereum/actions/createWallet';

const styles = {
    form: {
        padding: 20,
        margin: 100,
        width: 500,
        //height: 300,
    },
    title: {
        padding: '0 0 20px 0',
    },
    tabs: {
        padding: '0 0 15px 0',
    },
    inputDiv: {
        padding: '0 0 15px 0',
    },
    input: {
        width: '100%',
    },
    button: {
        width: '100%',
    },
    error: {
        padding: '15px 0 0 0',
        color: 'red',
    },

};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: undefined,
            redirect: false,
            accountObj: undefined,
            error: '',
            value: 0,
        };
    }

    handleOnClick() {
        console.log(this.state.address);
        let wallet = undefined;
        try {
            wallet = accountActions.createAccFromPK(this.state.address);
            console.log(wallet);
            this.setState({
                redirect: true,
                accountObj: wallet,
            });
        }
        catch (e) {
            console.log("error");
            this.setState({
                error: "invalid private key",
            });
        }
    };

    handleChange(event, value) {
        this.setState({
            value,
            error: '',
        });
    };

    render() {
        if (this.state.redirect) {
            return <Main account={this.state.accountObj}/>
        }
        const {classes} = this.props;
        return (
            <div>
                <Grid container={true}
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <Grid>
                        <Paper className={classes.form} elevation={5}>

                            <Typography
                                className={classes.title}
                                variant="h5"
                            >
                                Login:
                            </Typography>

                            <Tabs
                                value={this.state.value}
                                className={classes.tabs}
                                variant="fullWidth"
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange.bind(this)}
                            >
                                <Tab
                                    label="Private key"
                                />
                                <Tab
                                    //disabled={true}
                                    label="Saved wallet"
                                />
                            </Tabs>

                            {this.state.value === 0 &&
                            <div>

                                <div className={classes.inputDiv}>
                                    <TextField
                                        className={classes.input}
                                        label="0x"
                                        variant="outlined"
                                        type={'password'}
                                        onChange={e => this.setState({address: e.target.value})}
                                    />
                                </div>

                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.handleOnClick.bind(this)}>
                                    Login
                                </Button>
                                <p className={classes.error}>{this.state.error}</p>

                            </div>

                            }
                            {this.state.value === 1 &&
                            <div>
                                <div className={classes.inputDiv}>
                                    <TextField
                                        className={classes.input}
                                        label="0x"
                                        variant="outlined"
                                        type={'password'}
                                        onChange={e => this.setState({address: e.target.value})}
                                    />
                                </div>

                                <div className={classes.inputDiv}>
                                    <TextField
                                        className={classes.input}
                                        label="0x"
                                        variant="outlined"
                                        type={'password'}
                                        onChange={e => this.setState({address: e.target.value})}
                                    />
                                </div>

                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.handleOnClick.bind(this)}>
                                    Login
                                </Button>
                                <p className={classes.error}>{this.state.error}</p>

                            </div>
                            }

                            <Button color="primary" className={classes.button}>
                                Create new wallet
                            </Button>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

//<p>0x7cc936b609b30ad652a5fe88c0574a6ec63f9e2d577f577acdd935100bf37af9</p>

export default withStyles(styles)(Login);

