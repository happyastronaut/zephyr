import React, {Component} from 'react';
import Login from './components/Login/Login';
import * as accountActions from "./ethereum/actions/createWallet";
import {BrowserRouter as Router, Redirect, HashRouter, Route, Link} from "react-router-dom";

import Main from './main';
import CreateNewWallet from "./components/CreateNewWallet/CreateNewWallet";

import * as crypto from './utils/crypto';

const cryptoNode = require('crypto');

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

        const hash = cryptoNode.createHash('sha256');
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
        const hash = cryptoNode.createHash('sha256');
        const hashPassword = hash.update(password).digest('hex');
        let ethWallet, newWallet;

        console.log(password);

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

        if (this.state.walletList === []) {
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


//TODO: 1) add encryption 2) add notifications 3) fix wallet names overwriting 4) finish frontend


/*
"wallet": {
		"eth": [
			{
				"name": "123",
				"password": "qweqwe",
				"pk": "0x04352fc6326fe748815d0c55dbcc44beeb87ac7d3c92db0881d45678089dd70f"
			},
			{
				"name": "qwe",
				"password": "qweqwe",
				"pk": "0xb72976592a1d0d7aa9926f23c15cd4f85ce052aa927258b6859cda98b1d61320"
			},
			{
				"name": "hello",
				"password": "123456",
				"pk": "0xed1a5d3389ad43c9cc35910bfcd6fe9af60c53cdebd27b41f550f6381455a82a"
			},
			{
				"name": "gfhdg",
				"password": "123456",
				"pk": "0xf7592007b29d110f3d297c45d2c3b04dd86bde0564d56ec9af5824d44cf50984"
			},
			{
				"name": "helloworldwallet",
				"password": "qweqwe",
				"pk": "0x18cc3e38351d41c4a9dc84a63d88d2d19ecb529fa213186690ba42a1fd6a96b2"
			},
			{
				"name": "nnn",
				"password": {
					"_handle": {},
					"writable": true,
					"readable": true
				},
				"pk": "0xf94883d41cbe357e6218738b7ec2f27f95f7b2bec663807984b9f8db1d87f686"
			},
			{
				"name": "sdgdgd",
				"password": {
					"type": "Buffer",
					"data": [
						20,
						17,
						36,
						43,
						33,
						57,
						249,
						250,
						87,
						168,
						2,
						225,
						220,
						23,
						46,
						62,
						28,
						167,
						101,
						90,
						194,
						208,
						109,
						131,
						178,
						41,
						88,
						149,
						16,
						114,
						38,
						27
					]
				},
				"pk": "0x157284841bf5ca2a62b647e6e4472f8845b72156ad5b3d27a4e977ce2d51fa74"
			},
			{
				"name": "dhdgdbbgdgggfb123",
				"password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
				"pk": "0x0787e8b0f5a5fc8605b43014b79c2413846b789d7bfc88797df19b1fc36b1708"
			}
		]
	}
 */