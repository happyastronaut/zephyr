import React from 'react';
import getBalance from './ethereum/actions/getBalance';
import createWallet from  './ethereum/actions/createWallet';

//fixme
export default class App extends React.Component {

    getB(){
        return getBalance;
    }

    getW(){
        return createWallet;
    }

    render() {
        return (
            <div>
                <h2>{this.getW()}</h2>
            </div>);
    }
}
