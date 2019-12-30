const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

import {ropstenRpcURL} from '../constants/nets';

const web3 = new Web3('https://ropsten.infura.io/v3/027bb869b03f4456aa1e9d13aa1f6506');

module.exports = {

    sendAsserts: async (senderAddress, senderPK, receiverAddress, amount, setGasPrice = '10', setGasLimit = 21000) => {
        const txCount = await web3.eth.getTransactionCount(senderAddress);

        const slicedPK = senderPK.slice(2, senderPK.length);
        const bufferedPK = Buffer.from(slicedPK, 'hex');

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: receiverAddress,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
            gasLimit: web3.utils.toHex(setGasLimit),
            gasPrice: web3.utils.toHex(web3.utils.toWei(setGasPrice, 'gwei'))
        };

        const tx = new Tx(txObject);
        tx.sign(bufferedPK);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        return new Promise((res, rej) => {
            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                return res(txHash);
            })
        });

    },

};
