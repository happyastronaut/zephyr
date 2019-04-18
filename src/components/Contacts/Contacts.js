import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from '@material-ui/core/Button';
import {ropstenRpcURL} from "../../ethereum/constants/nets";
import FullScreenDialog from './FullScreenDialog';
import ContactDialog from "./ContactDialog";

import Tr from './Tr';

const Store = require('electron-store');
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

    async addNewContact(item) {

        await this.setState({
            contactsList: [...this.state.contactsList, item],
        });
        this.updateStore();
        console.log("Added");
    };

    async deleteContact(index) {
        const action = event.target.getAttribute('data-action');
        switch (action) {
            case 'delete':
                this.state.contactsList.splice(index, 1);
                const newArr = this.state.contactsList;
                await this.setState({
                    contactsList: newArr,
                });
                break;
            case 'update':
                console.log('edit ' + index);
                break;
        }

        this.updateStore();
    }

    updateStore() {
        store.set('contactsList', this.state.contactsList);
    }

    render() {
        const that = this;
        return (
            <div>
                <Table striped bordered responsive="sm" hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.contactsList.map(function (item, index) {
                            return (
                                <Tr key={item.name.concat(item.address)} onClick={(index) => that.deleteContact(index)}
                                    item={item} index={index}/>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <ContactDialog list={this.state.contactsList} onClick={this.addNewContact.bind(this)}/>

            </div>
        )
    }
}


export default Contacts;