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

import Grid from '@material-ui/core/Grid';

import MaterialTable from "material-table";

import {withStyles} from '@material-ui/styles';

const useStyles = {
    container: {
        width: '87vw',
        // height: '80vh',
        padding: 5,
        margin: '15px',
    },
    table: {
        // width: '100vw',
        // height: '100%',
    },
};

class Contacts extends Component {

    constructor() {
        super();
        this.state = {

            columns: [
                {title: 'Name', field: 'name',},
                {title: 'Address', field: 'address', /*cellStyle: {width: '70%',}*/},
            ],

            data: [
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
                {name: 'Zerdsfgdsgsdfya Betül', address: '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e'},
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

            <div className={classes.container}>
                <MaterialTable
                    title="Contacts"
                    columns={this.state.columns}
                    data={this.state.data}
                    // data={contactList}
                    options={{
                        pageSize: 7,
                        pageSizeOptions: [7],
                        // minBodyHeight: '1000px',
                        // maxBodyHeight: '1000px'
                    }}
                    // style={{width: '100%', height: '500px',}}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        const data = this.state.data;
                                        data.push(newData);
                                        this.setState({data}, () => resolve());
                                    }
                                    resolve()
                                }, 100)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        const data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        this.setState({data}, () => resolve());
                                    }
                                    resolve()
                                }, 100)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        let data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        this.setState({data}, () => resolve());
                                    }
                                    resolve()
                                }, 100)
                            }),
                    }}
                />

            </div>

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