const Web3 = require('web3');
import {ropstenRpcURL} from '../constants/nets';

const web3 = new Web3(ropstenRpcURL);

module.exports = {
    getBalance: async (address) => {
      return await web3.eth.getBalance(address);
    },
};

