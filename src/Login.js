import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';

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
    createButtonDiv: {
        margin: '15px 0 0 0',
    },
    createButton: {
        width: '100%',
    },

};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: '',
            password: undefined,
            value: 0,
        };
    }

    handleChange(event, value) {
        this.setState({
            value,
            error: '',
        });
    };


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
                                        onChange={e => this.setState({pk: e.target.value})}
                                    />
                                </div>

                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => this.props.onLoginClick(this.state.pk)}>
                                    Login
                                </Button>

                            </div>

                            }
                            {this.state.value === 1 &&
                            <div>
                                <div className={classes.inputDiv}>
                                    <TextField
                                        className={classes.input}
                                        select
                                        label="Wallet"
                                        variant="outlined"
                                        value={this.state.wallet}
                                        onChange={e => this.setState({wallet: e.target.value})}
                                    >
                                        {
                                            this.props.walletList.map(option => (
                                                <MenuItem key={option.name} value={option.pk}>
                                                    {option.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
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

                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => this.props.onLoginClick1(this.state.wallet, this.state.password)}
                                >
                                    Login
                                </Button>
                                <p className={classes.error}>{this.state.error}</p>

                            </div>
                            }

                            <div className={classes.createButtonDiv}>
                                <Button
                                    className={classes.createButton} color="primary"
                                    onClick={() => this.props.onCreateClick()}
                                >
                                    Create new wallet
                                </Button>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

//<p>0x7cc936b609b30ad652a5fe88c0574a6ec63f9e2d577f577acdd935100bf37af9</p>

export default withStyles(styles)(Login);

