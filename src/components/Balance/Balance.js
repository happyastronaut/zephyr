import React, {Component} from 'react';
import * as balanceActions from '../../ethereum/actions/getBalance';

const Web3 = require('web3');

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/styles';

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

    constructor(props) {
        super(props);
        this.state = {
            balance: null,
        };
    }

    async componentDidMount() {
        this.setState({balance: await balanceActions.getBalance(this.props.networkUrl, this.props.address)});
    }

    render() {
        const {classes} = this.props;
        let balance = this.state.balance || '0';
        const web3 = new Web3(this.props.networkUrl);
        if (balance) {
            balance = web3.utils.fromWei(balance);
        }
        return (

            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.header}>
                    <Grid container>
                        <Grid item xs={9} className={classes.text}>
                            <Typography><b>Balance:</b> {parseFloat(balance).toFixed(2)} ETH </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        );
    }

}

// <button onClick={() => this.checkBalance(this.props.address)}>Refresh</button>

export default withStyles(styles)(Balance);
