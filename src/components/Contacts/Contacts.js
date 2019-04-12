import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ropstenRpcURL} from "../../ethereum/constants/nets";

const Web3 = require('web3');
const Store = require('electron-store');

const web3 = new Web3(ropstenRpcURL);
const store = new Store();

class Contacts extends Component {

    constructor() {
        super();
        this.state = {
            contactsList: [],
        };
    }

    componentDidMount() {
        this.loadContacts();
    }

    loadContacts() {
        const loaded = store.get('contactsList');
        this.setState({
            contactsList: loaded,
        });
    }

    async addNewContact(event) {
        event.preventDefault();

        const item = {
            name: event.target.formName.value,
            address: event.target.formAddress.value,
        };

        if (item.name) {
            if (web3.utils.isAddress(item.address)) {
                if (!this.state.contactsList.some(el => el.address === item.address)) {
                    await this.setState({
                        contactsList: [...this.state.contactsList, item],
                    });
                    store.set('contactsList', this.state);
                    store.openInEditor();
                    console.log("Added");
                } else {
                    console.log("Address already in list ");
                }
            } else {
                console.log("Not address");
            }
        } else {
            console.log("Empty name");
        }
    };

    render() {
        return (
            <div>
                <Table striped bordered responsive="sm" hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.contactsList.map(function (item, index) {
                            return (
                                <tr key={item.name.concat(item.address)}>
                                    <td>{++index}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <Form onSubmit={this.addNewContact.bind(this)}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Contacts name"/>
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Control type="text" placeholder="Address"/>
                        <Form.Text className="text-muted">
                            Please review and ensure that you have entered the address correctly to avoid loss of funds
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">Add</Button>
                </Form>
            </div>
        )
    }
}

export default Contacts;