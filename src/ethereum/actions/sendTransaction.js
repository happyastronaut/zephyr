const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

import {ropstenRpcURL} from '../constants/nets';
import {myTestAddr, mySecondAddr, myTestPK} from '../constants/wallets';

const web3 = new Web3(ropstenRpcURL);

// const bPK1 = Buffer.from(myTestPK, 'hex');
//
// const sendAsserts = web3.eth.getTransactionCount(myTestAddr, (err, txCount) => {
//
//     const txObject = {
//         nonce:    web3.utils.toHex(txCount),
//         to:       mySecondAddr,
//         value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
//         gasLimit: web3.utils.toHex(21000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
//     };
//
//     const tx = new Tx(txObject);
//     tx.sign(bPK1);
//
//     const serializedTx = tx.serialize();
//     const raw = '0x' + serializedTx.toString('hex');
//
//     web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//         console.log('txHash:', txHash)
//     });
//
// });
//
// export default sendAsserts;

//const bPK1 = Buffer.from(myTestPK, 'hex');

module.exports = {

    sendAsserts: async (senderAddress, senderPK, receiverAddress, amount) => {
        const txCount = await web3.eth.getTransactionCount(senderAddress);

        const slicedPK = senderPK.slice(2, senderPK.length);
        const bufferedPK = Buffer.from(slicedPK, 'hex');

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: receiverAddress,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
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
