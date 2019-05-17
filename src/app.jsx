import React, {Component} from 'react';
import Login from './components/Login/Login';
import * as accountActions from "./ethereum/actions/createWallet";
import {BrowserRouter as Router, Redirect, HashRouter, Route, Link} from "react-router-dom";

import Main from './main';
import CreateNewWallet from "./components/CreateNewWallet/CreateNewWallet";

import * as crypto from './utils/crypto';

const Store = require('electron-store');
const store = new Store();

class App extends Component {

    constructor(props) {
        super(props);
        //store.openInEditor();
        this.state = {
            route: 'login',
            isLogged: false,
            accountObj: undefined,
            error: '',
            walletList: [],
            contactList: [],
        };
    }

    componentDidMount() {
        const wallets = store.get('wallet.eth');
        const contacts = store.get('contactsList');
        this.setState({
            walletList: wallets,
            contactList: contacts,
        });
    }

    onLoginClickPrivateKey(pk) {
        let wallet = undefined;
        try {
            wallet = accountActions.createAccFromPK(pk);
            this.setState({
                accountObj: wallet,
                isLogged: true,
            });
        }
        catch (e) {
            console.log("error");
            this.setState({
                error: "invalid private key",
            });
        }
    }

    onLoginClickSavedWallet(walletName, password){
        const wallets = store.get('wallet.eth');
        let wallet = wallets.find(x => x.name === walletName);

        if(wallet === undefined){
            console.log('error: corrupted file');
            return;
        }

        if(wallet.password !== password){
            console.log('error: wrong password');
            return;
        }

        try {
            wallet = accountActions.createAccFromPK(wallet.pk);
            this.setState({
                accountObj: wallet,
                isLogged: true,
            });
        }
        catch (e) {
            console.log("error");
            this.setState({
                error: "invalid private key",
            });
        }
    }

    handleOnCreateClick() {
        this.setState({
            route: 'create',
        });
    }

    handleOnLogoutClick() {
        this.setState({
            isLogged: false,
            accountObj: undefined,
        })
    }

    handleOnBack() {
        this.setState({
            route: 'login',
        });
    }

    async createNewWallet(name, password) {
        const ethWallet = accountActions.createAcc();
        const newWallet = {
            name: name,
            password: password,
            pk: ethWallet.privateKey,
        };
        await this.setState({
            walletList: [...this.state.walletList, newWallet],
        });
        store.set('wallet.eth', this.state.walletList);
        this.setState({
            route: 'login',
        });
    }

    render() {
        if (this.state.isLogged) {
            return (
                <Main
                    account={this.state.accountObj}
                    onLogoutClick={this.handleOnLogoutClick.bind(this)}
                />
            )
        }

        switch (this.state.route) {
            case 'login':
                return (
                    <Login
                        onLoginClickPrivateKey={this.onLoginClickPrivateKey.bind(this)}
                        onLoginClickSavedWallet={this.onLoginClickSavedWallet.bind(this)}
                        onCreateClick={this.handleOnCreateClick.bind(this)}
                        walletList={this.state.walletList}
                    />
                );
            case 'create':
                return (
                    <CreateNewWallet
                        createConfirmedWallet={this.createNewWallet.bind(this)}
                        onBackClick={this.handleOnBack.bind(this)}
                    />
                )
        }
    };
}

export default App;