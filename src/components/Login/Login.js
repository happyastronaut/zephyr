import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import WithPrivateKey from './WithPrivateKey/WithPrivateKey';
import WithSavedWallet from './WithSavedWallet/WithSavedWallet';

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
                                    label="Saved wallet"
                                />
                            </Tabs>

                            {this.state.value === 0 &&
                            <WithPrivateKey onLoginClickPrivateKey={this.props.onLoginClickPrivateKey}/>
                            }

                            {this.state.value === 1 &&
                            <WithSavedWallet walletList={this.props.walletList}
                                             onLoginClickSavedWallet={this.props.onLoginClickSavedWallet}/>
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

