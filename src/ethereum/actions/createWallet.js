import {ropstenRpcURL} from "../constants/nets";

const Web3 = require('web3');
const web3 = new Web3(ropstenRpcURL);

const acc = web3.eth.accounts.create();

export default acc.address;

