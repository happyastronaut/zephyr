import React, {Component} from 'react';
import Login from './components/Login/Login';
import * as accountActions from "./ethereum/actions/createWallet";
import {BrowserRouter as Router, Redirect, HashRouter, Route, Link} from "react-router-dom";

import { withSnackbar } from 'notistack';

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
            this.props.enqueueSnackbar('Account file is corrupted', {
                variant: 'error',
            });
            return;
        }

        const hash = crypto.createSha256Hash();
        if (wallet.password !== hash.update(password).digest('hex')) {
            this.props.enqueueSnackbar('Wrong password', {
                variant: 'error',
            });
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
            this.props.enqueueSnackbar('Invalid private key', {
                variant: 'error',
            });
            console.log("error: Invalid private key");
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
        let ethWallet, newWallet, message;

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
            message = 'Wallet created and added to your account';
        }
        else {
            newWallet = {
                name: name,
                password: hashPassword,
                pk: crypto.encrypt(privateKey, password),
            };
            message = 'Wallet imported to your account';
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
        this.props.enqueueSnackbar(message, {
            variant: 'info',
        });
    }

    render() {
        if (this.state.isLogged) {
            return (
                <Main
                    account={this.state.accountObj}
                    onLogoutClick={this.handleOnLogoutClick.bind(this)}
                    enqueueSnackbar={this.props.enqueueSnackbar}
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
                        enqueueSnackbar={this.props.enqueueSnackbar}
                    />
                );
            case 'import':
                return (
                    <CreateNewWallet
                        mtype={1}
                        createConfirmedWallet={this.createNewWallet.bind(this)}
                        onBackClick={this.handleOnBack.bind(this)}
                        enqueueSnackbar={this.props.enqueueSnackbar}
                    />
                );
        }
    };
}

export default withSnackbar(App);


//TODO: 2) add notifications  4) finish frontend
