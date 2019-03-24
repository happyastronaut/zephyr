const Web3 = require('web3');
import {ropstenRpcURL} from '../constants/nets';
import {myTestAddr} from '../constants/wallets';

const web3 = new Web3(ropstenRpcURL);

export default web3.eth.getBalance(myTestAddr).then((wei) => {
    const balance = web3.utils.fromWei(wei, 'ether');
    console.log(balance);
});