import React, {Component} from 'react';
import * as send from '../../ethereum/actions/sendTransaction'

import Button from 'react-bootstrap/Button';

class SendAsserts extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        //0x2dDd58766120254a9Ebc4E7E2Cf4594a350abDeb
        const amount = event.target.amount.value.replace(',', '.');
        const res = await send.sendAsserts(this.props.account.address, this.props.account.privateKey, event.target.receiver.value, amount);
        console.log(res);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor={'receiver'}>To:</label>
                    <input id={'receiver'}/>
                    <label htmlFor={'amount'}>Amount:</label>
                    <input id={'amount'}/>
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

export default SendAsserts;