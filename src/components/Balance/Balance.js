import React, {Component} from 'react';
import * as balanceActions from '../../ethereum/actions/getBalance';
import {ropstenRpcURL} from '../../ethereum/constants/nets';
const Web3 = require('web3');

const web3 = new Web3(ropstenRpcURL);

class Balance extends Component {

    constructor() {
        super();
        this.state = {
            balance: null,
        };
    }

    componentDidMount(){
        this.checkBalance(this.props.address);
    }


    async checkBalance(address){
        this.setState({balance: await balanceActions.getBalance(address)});
    }


    render() {
        let balance = this.state.balance;
        if(balance){
            balance = web3.utils.fromWei(balance);
        }
        return (
            <div>
                <p>{balance} ETH</p>
                <button onClick={() => this.checkBalance(this.props.address)}>Refresh</button>
            </div>);
    }

}

export default Balance;
