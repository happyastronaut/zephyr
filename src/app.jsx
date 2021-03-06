import React, {Component} from 'react';
import Main from './Main/Main';
import Login from './components/Login/Login';
import CreateNewWallet from "./components/CreateNewWallet/CreateNewWallet";
import * as accountActions from "./ethereum/actions/createWallet";
import * as crypto from './utils/crypto';

import {withSnackbar} from 'notistack';
import networks from "./ethereum/constants/nets";

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
            networkUrl: networks.networks[0].url,
        };
    }

    updateContacts(data) {
        this.props.enqueueSnackbar('Contacts updated', {
            variant: 'success',
        });
        store.set('contactsList', data);

    }

    componentDidMount() {
        const wallets = store.get('wallet.eth');
        const contacts = store.get('contactsList');
        this.setState({
            walletList: wallets,
            contactList: contacts,
        });
        // this.onLoginClickPrivateKey('0x7cc936b609b30ad652a5fe88c0574a6ec63f9e2d577f577acdd935100bf37af9'); //DEBUG
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
        if (wallet.length > 0) name = `${name}(${wallet.length})`;

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
            variant: 'success',
        });
    }

    invokeSnackbar(){
        this.props.enqueueSnackbar('bar', {
            variant: 'success',
        });
    }

    switchNetwork(newNetUrl) {
        this.setState({
            networkUrl: newNetUrl,
        })
    }

    render() {

        if (this.state.isLogged) {
            return (
                <Main
                    account={this.state.accountObj}
                    contactList={this.state.contactList}
                    onLogoutClick={this.handleOnLogoutClick.bind(this)}
                    updateContacts={this.updateContacts.bind(this)}
                    enqueueSnackbar={this.props.enqueueSnackbar}
                    invokeSnackbar={this.invokeSnackbar.bind(this)}
                    networkUrl={this.state.networkUrl}
                    switchNetwork={this.switchNetwork.bind(this)}
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
