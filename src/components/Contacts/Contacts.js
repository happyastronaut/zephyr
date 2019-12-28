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

const Store = require('electron-store');
const store = new Store();

const useStyles = {
    container: {
        width: '92vw',
        // height: '80vh',
        padding: 5,
        position: 'relative',
        display: 'inline-block',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    table: {
        // width: '100vw',
        // height: '100%',
    },
};

class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Name', field: 'name',},
                {title: 'Address', field: 'address', /*cellStyle: {width: '70%',}*/},
            ],
            data: props.contactList,
        };
    }

    render() {
        const {classes} = this.props;
        const update = this.props.updateContacts;

        return (

            <div className={classes.container}>
                <MaterialTable
                    title="Contacts"
                    columns={this.state.columns}
                    data={this.state.data}
                    // data={contactList}
                    options={{
                        pageSize: 11,
                        pageSizeOptions: [11],
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
                                    update(this.state.data);
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
                                    update(this.state.data);
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
                                    update(this.state.data);
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