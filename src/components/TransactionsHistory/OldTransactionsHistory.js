import React, {Component} from 'react';
import {MDBDataTable} from 'mdbreact';
import Paper from '@material-ui/core/Paper';

import {ropstenRpcURL} from "../../ethereum/constants/nets";
import {withStyles} from '@material-ui/styles';

const styles = {
    container: {
        width: '100%',
    },
    form: {
        padding: '15px 10px',
        margin: '5px 0px ',
        width: '90vw',
        height: '100%'
    },
    titleRow: {
        padding: '0 0 10px 0',
    },
    title: {
        padding: '7px 0 0 0',
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

};

const Web3 = require('web3');
const web3 = new Web3(ropstenRpcURL);

class OldTransactionsHistory extends Component {
    constructor() {
        super();
        this.state = {
            history: [],
        };
    }

    componentDidMount() {
        this.getHistory();
    }

    async getHistory() {
        const data = await fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${this.props.address}`).then((res) => {
                return res.json();
            }
        );
        this.setState({
            history: data.result.reverse(),
        });
    }

    render() {
        const {classes} = this.props;
        const myData = {
            columns: [
                {
                    label: 'Block',
                    field: 'blockNumber',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'From',
                    field: 'from',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'To',
                    field: 'to',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Date',
                    field: 'timestamp',
                    sort: 'asc',
                    width: 120
                },
            ],
            rows: [],
        };

        this.state.history.forEach((item) => {
            myData.rows.push({
                blockNumber: item.blockNumber,
                from: item.from,
                to: item.to,
                amount: `${web3.utils.fromWei(item.value)} ETH`,
                timestamp: new Date(item.timeStamp * 1000).toLocaleString(),
            });
        });

        //console.log(this.state.history);

        return (
            <Paper className={classes.form} elevation={5}>
            <MDBDataTable
                scrollY
                maxHeight="70vh"
                striped
                bordered
                small
                data={myData}
            />
            </Paper>
        )
    }
}


export default withStyles(styles)(OldTransactionsHistory);