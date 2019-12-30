const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/027bb869b03f4456aa1e9d13aa1f6506');

module.exports = {
    createAcc: () => {
        return web3.eth.accounts.create();
    },

    createAccFromPK: (pk) => {
        return web3.eth.accounts.privateKeyToAccount(pk);
    },

};

