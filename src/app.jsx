import React, {Component} from 'react';
import * as accountActions from './ethereum/actions/createWallet';
import Address from "./components/Address/Address";
import Balance from "./components/Balance/Balance";
import SendAsserts from "./components/SendAsserts/SendAsserts";

class App extends Component {
    constructor() {
        super();
        this.state = {
            account: undefined,
        };
    }

    render() {
        //this.state.account = accountActions.createAcc();
        this.state.account = accountActions.createAccFromPK('0x7cc936b609b30ad652a5fe88c0574a6ec63f9e2d577f577acdd935100bf37af9');

        return (
            <div>
                <Address address={this.state.account.address}/>
                <Balance address={this.state.account.address}/>
                <SendAsserts account={this.state.account}/>
            </div>);
    }
}

export default App;
