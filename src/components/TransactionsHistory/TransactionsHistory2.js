import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableContainer } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from "@material-ui/styles/index";
import {ropstenRpcURL} from "../../ethereum/constants/nets";

const styles = {
    root: {
        width: '100%',
    },
    container: {
        height: '90vh',
    },
};

const Web3 = require('web3');
const web3 = new Web3(ropstenRpcURL);

class TransactionsHistory extends Component {

    constructor() {
        super();
        this.state = {
            history: [],
            columns: [
                { id: 'name', label: 'Name', minWidth: 170 },
                { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
                {
                    id: 'population',
                    label: 'Population',
                    minWidth: 170,
                    align: 'right',
                    format: value => value.toLocaleString(),
                },
                {
                    id: 'size',
                    label: 'Size\u00a0(km\u00b2)',
                    minWidth: 170,
                    align: 'right',
                    format: value => value.toLocaleString(),
                },
                {
                    id: 'density',
                    label: 'Density',
                    minWidth: 170,
                    align: 'right',
                    format: value => value.toFixed(2),
                },
            ],
            rows: [
                createData('India', 'IN', 1324171354, 3287263),
                createData('China', 'CN', 1403500365, 9596961),
                createData('Italy', 'IT', 60483973, 301340),
                createData('United States', 'US', 327167434, 9833520),
                createData('Canada', 'CA', 37602103, 9984670),
                createData('Australia', 'AU', 25475400, 7692024),
                createData('Germany', 'DE', 83019200, 357578),
                createData('Ireland', 'IE', 4857000, 70273),
                createData('Mexico', 'MX', 126577691, 1972550),
                createData('Japan', 'JP', 126317000, 377973),
                createData('France', 'FR', 67022000, 640679),
                createData('United Kingdom', 'GB', 67545757, 242495),
                createData('Russia', 'RU', 146793744, 17098246),

            ],
        };
        function createData(name, code, population, size) {
            const density = population / size;
            return { name, code, population, size, density };
        }
    }

    componentDidMount() {
        this.getHistory();
    }

    async getHistory() {
        const data = await fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${this.props.address}`).then((res) => {
                return res.json();
            }
        );
        this.setState({
            history: data.result.reverse(),
        });
    }


    render() {
        const {classes} = this.props;
         const [page, setPage] = [0,0] //React.useState(0);
         const [rowsPerPage, setRowsPerPage] = [10,10] //React.useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = event => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.state.columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {this.state.columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={this.state.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}


export default withStyles(styles)(TransactionsHistory);