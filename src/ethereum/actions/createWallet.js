import {ropstenRpcURL} from "../constants/nets";
const Web3 = require('web3');

const web3 = new Web3(ropstenRpcURL);

module.exports = {
    createAcc: () => {
        return web3.eth.accounts.create();
    },

    createAccFromPK: (pk) => {
        return web3.eth.accounts.privateKeyToAccount(pk);
    },

};

