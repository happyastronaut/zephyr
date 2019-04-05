import React, {Component} from 'react';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

import * as accountActions from './ethereum/actions/createWallet';
import Address from "./components/Address/Address";
import Balance from "./components/Balance/Balance";
import SendAsserts from "./components/SendAsserts/SendAsserts";
import TransactionsHistory from "./components/TransactionsHistory/TransactionsHistory";

class App extends Component {
    constructor() {
        super();
        this.state = {
            account: undefined,
        };
    }

    render() {
        this.state.account = accountActions.createAccFromPK('0x7cc936b609b30ad652a5fe88c0574a6ec63f9e2d577f577acdd935100bf37af9');

        return (
            <div>
                <Address address={this.state.account.address}/>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Wallet</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Send</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">History</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Balance address={this.state.account.address}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <SendAsserts account={this.state.account}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <TransactionsHistory address={this.state.account.address}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>);
    }
}

export default App;
