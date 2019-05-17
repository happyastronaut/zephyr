import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import {withStyles} from '@material-ui/styles';

const styles = {
    inputDiv: {
        padding: '0 0 15px 0',
    },
    input: {
        width: '100%',
    },
    button: {
        width: '100%',
    },
};

class WithSavedWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: '',
        };
    }

    render() {
        const {classes} = this.props;
        return (
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
                                <MenuItem key={option.name} value={option.name}>
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
                    onClick={() => this.props.onLoginClickSavedWallet(this.state.wallet, this.state.password)}
                >
                    Login
                </Button>

            </div>
        )
    }
}

export default withStyles(styles)(WithSavedWallet);