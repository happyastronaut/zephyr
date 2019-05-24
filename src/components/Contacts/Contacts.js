import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class Contacts extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <Table  className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


export default withStyles(useStyles)(Contacts);


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