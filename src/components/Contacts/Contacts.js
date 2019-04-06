import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
        const loaded = [
            {
                name: 'Jason',
                address: '0x132123123',
            },
            {
                name: 'Leavers',
                address: '0x78789789897',
            },
            {
                name: 'Mom',
                address: '0x4564654554665',
            },
        ];
        this.setState({
            contactsList: loaded,
        });
    }


    addNewContact(event) {
        event.preventDefault();
        const item = {
            name: event.target.formName.value,
            address: event.target.formAddress.value,
        };

        this.setState({
            contactsList: [...this.state.contactsList, item],
        });

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