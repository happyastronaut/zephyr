const Web3 = require('web3');


module.exports = {
    getBalance: async (networkUrl, address) => {
        const web3 = new Web3(networkUrl);
        return await web3.eth.getBalance(address);
    },
};

