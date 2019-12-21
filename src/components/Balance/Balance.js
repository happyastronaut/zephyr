import React, {Component} from 'react';
import * as balanceActions from '../../ethereum/actions/getBalance';
import {ropstenRpcURL} from '../../ethereum/constants/nets';

const Web3 = require('web3');

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BalanceIcon from '@material-ui/icons/AccountBalanceWallet'

import {withStyles} from '@material-ui/styles';

const web3 = new Web3(ropstenRpcURL);
const styles = {
    container: {
        padding: '0px',
    },
    header: {
        padding: '5px',
        margin: '5px',
    },
    text: {
        padding: '0 0px',
    },
};

class Balance extends Component {

    constructor() {
        super();
        this.state = {
            balance: null,
        };
    }

    componentDidMount() {
        this.checkBalance(this.props.address);
    }

    async checkBalance(address) {
        this.setState({balance: await balanceActions.getBalance(address)});
    }

    render() {
        const {classes} = this.props;
        let balance = this.state.balance;
        if (balance) {
            balance = web3.utils.fromWei(balance);
        }
        return (

            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.header}>
                    <Grid container>
                        <Grid item xs={9} className={classes.text}>
                            <Typography><b>Balance:</b> {balance} ETH </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        );
    }

}

// <button onClick={() => this.checkBalance(this.props.address)}>Refresh</button>

export default withStyles(styles)(Balance);
