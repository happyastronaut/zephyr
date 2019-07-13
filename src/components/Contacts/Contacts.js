import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';

import MaterialTable from "material-table";

import {withStyles} from '@material-ui/styles';

const useStyles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        height: 100,
        display: 'flex',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
    },
};

class Contacts extends Component {

    constructor() {
        super();
        this.state = {

            columns: [
                {title: 'Name', field: 'name'},
                {title: 'Surname', field: 'surname'},
                {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
                },
            ],

            data: [
                {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
                {
                    name: 'Zerya Betül',
                    surname: 'Baran',
                    birthYear: 2017,
                    birthCity: 34,
                },
            ],
        };
    }

    onEdit(index) {
        console.log("edit" + index);
    }

    render() {

        const {classes} = this.props;
        let contactList = this.props.contactList;

        return (

            <MaterialTable
                className={classes.root}
                title="Editable Example"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.data];
                                data.push(newData);
                                this.setState({
                                    data: data,
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.data];
                                data[data.indexOf(oldData)] = newData;
                                this.setState({
                                    data: data,
                                });
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.data];
                                data.splice(data.indexOf(oldData), 1);
                                this.setState({
                                    data: data,
                                });
                            }, 600);
                        }),
                }}
            />
        );
    }
}


export default withStyles(useStyles)(Contacts);
//export default Contacts;

/*
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from '@material-ui/core/Button';
import {ropstenRpcURL} from "../../ethereum/constants/nets";
import FullScreenDialog from './FullScreenDialog';
import ContactDialog from "./ContactDialog";

import Tr from './Tr';


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
                                <Tr key={item.name.concat(item.pk)} onClick={(index) => that.deleteContact(index)}
                                    item={item} index={index}/>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <ContactDialog list={this.state.contactsList} onClick={this.addNewContact.bind(this)}/>

            </div>
            )
 */


/*


 */