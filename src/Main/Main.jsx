import React, {Component} from 'react';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import Address from "../components/Address/Address";
import Balance from "../components/Balance/Balance";
import SendAsserts from "../components/SendAsserts/SendAsserts";
import TransactionsHistory from "../components/TransactionsHistory/TransactionsHistory";
import Receive from "../components/Receive/Receive";
import Contacts from "../components/Contacts/Contacts";
import Chart from "../components/Chart/Chart";

class Main extends Component {
    constructor() {
        super();
    }

    render() {
        const account = this.props.account;
        return (
            <div>
                <Address address={account.address}/>
                <p onClick={() => this.props.onLogoutClick()}>Logout</p>
                <Tab.Container defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="Wallet">Wallet</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Send">Send</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Receive">Receive</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="History">History</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Contacts">Contacts</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="Wallet">
                                    <Balance address={account.address}/>
                                    <Chart/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Send">
                                    <SendAsserts account={account}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Receive">
                                    <Receive address={account.address}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="History">
                                    <TransactionsHistory address={account.address}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Contacts">
                                    <Contacts/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>);
    }
}

export default Main;
