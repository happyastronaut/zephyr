import React, {Component} from 'react';

import MaterialTable from "material-table";

import {withStyles} from '@material-ui/styles';

const useStyles = {
    container: {
        width: '80vw',
        height: '100%',
        // padding: '200px 5px',

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
                        // minBodyHeight: '90vh',
                        // maxBodyHeight: '1000px'
                    }}
                    // style={{width: '100%', height: '400px',}}
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