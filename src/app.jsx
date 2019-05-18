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

    onLoginClickSavedWallet(walletName, password) {

        const wallets = store.get('wallet.eth');
        let wallet = wallets.find(x => x.name === walletName);

        if (wallet === undefined) {
            console.log('error: corrupted file');
            return;
        }

        const hash = crypto.createSha256Hash();
        if (wallet.password !== hash.update(password).digest('hex')) {
            console.log('error: wrong password');
            return;
        }

        try {
            const privateKey = crypto.decrypt(wallet.pk, password);
            wallet = accountActions.createAccFromPK(privateKey);
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

    handleOnImportClick() {
        this.setState({
            route: 'import',
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

    async createNewWallet(name, password, privateKey = undefined) {
        const hash = crypto.createSha256Hash();
        const hashPassword = hash.update(password).digest('hex');
        let ethWallet, newWallet;

        const wallets = store.get('wallet.eth');
        let wallet = wallets.filter(x => x.name === name);
        if(wallet.length > 0) name = `${name}(${wallet.length})`;

        if (privateKey === undefined) {
            ethWallet = accountActions.createAcc();
            newWallet = {
                name: name,
                password: hashPassword,
                pk: crypto.encrypt(ethWallet.privateKey, password),
            };
        }
        else {
            newWallet = {
                name: name,
                password: hashPassword,
                pk: crypto.encrypt(privateKey, password),
            };
        }

        if (this.state.walletList !== undefined) {
            await this.setState({
                walletList: [...this.state.walletList, newWallet],
            });
        } else {
            await this.setState({
                walletList: [newWallet],
            });
        }

        store.set('wallet.eth', this.state.walletList);
        this.setState({
            route: 'login',
        });
        console.log('success');
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
                        onImportClick={this.handleOnImportClick.bind(this)}
                        walletList={this.state.walletList}
                    />
                );
            case 'create':
                return (
                    <CreateNewWallet
                        mtype={0}
                        createConfirmedWallet={this.createNewWallet.bind(this)}
                        onBackClick={this.handleOnBack.bind(this)}
                    />
                );
            case 'import':
                return (
                    <CreateNewWallet
                        mtype={1}
                        createConfirmedWallet={this.createNewWallet.bind(this)}
                        onBackClick={this.handleOnBack.bind(this)}
                    />
                );
        }
    };
}

export default App;


//TODO: 2) add notifications  4) finish frontend
