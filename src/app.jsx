import React, {Component} from 'react';
import Login from './Login';
import * as accountActions from "./ethereum/actions/createWallet";

import Main from './main';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            accountObj: undefined,
            error: '',
        };
    }

    handleOnLoginClick(pk) {
        let wallet = undefined;
        try {
            wallet = accountActions.createAccFromPK(pk);
            console.log(wallet);
            this.setState({
                accountObj: wallet,
                redirect: true,
            });
        }
        catch (e) {
            console.log("error");
            this.setState({
                error: "invalid private key",
            });
        }
    };

    render() {
        if (this.state.redirect) {
            return (
                <Main
                    account={this.state.accountObj}
                />
            )
        }
        return (
            <Login
                onLoginClick={this.handleOnLoginClick.bind(this)}
            />
        )
    }
}


export default App;