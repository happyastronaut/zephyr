import React, {Component} from 'react';
import {MDBDataTable} from 'mdbreact';

import {ropstenRpcURL} from "../../ethereum/constants/nets";

const Web3 = require('web3');
const web3 = new Web3(ropstenRpcURL);

class TransactionsHistory extends Component {
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
        const myData = {
            columns: [
                {
                    label: 'Block',
                    field: 'blockNumber',
                    sort: 'asc',
                    width: 100
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
            <MDBDataTable
                scrollY
                maxHeight="450px"
                striped
                bordered
                small
                data={myData}
            />
        )
    }
}


export default TransactionsHistory;