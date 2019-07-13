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

//import MaterialTable from "material-table";

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

    onEdit(index) {
        console.log("edit" + index);
    }

    render() {
        const {classes} = this.props;
        let contactList = this.props.contactList;

        return (

            <Paper className={classes.root}>
                <Table  className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contactList.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{++index}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center"><IconButton onClick={() => this.onEdit(--index)}><Edit /> </IconButton> <IconButton onClick={this.onEdit(index)}><Delete /> </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

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

            <MaterialTable
                columns={[
                    {title: "Adı", field: "name"},
                    {title: "Soyadı", field: "surname"},
                    {title: "Doğum Yılı", field: "birthYear", type: "numeric"},
                    {
                        title: "Doğum Yeri",
                        field: "birthCity",
                        lookup: {34: "İstanbul", 63: "Şanlıurfa"}
                    }
                ]}
                data={[
                    {name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63}
                ]}
                title="Demo Title"
            />
 */