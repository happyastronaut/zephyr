import React, {Component} from 'react';
import Login from './Login';
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

        store.openInEditor();
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

    handleOnLoginClick(pk) {
        let wallet = undefined;
        try {
            wallet = accountActions.createAccFromPK(pk);
            console.log(wallet);
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

    handleOnLoginClick1(walletName, password){
        console.log(walletName, password);
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
                        onLoginClick={this.handleOnLoginClick.bind(this)}
                        onLoginClick1={this.handleOnLoginClick1.bind(this)}
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