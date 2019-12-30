import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {ropstenRpcURL} from "../../ethereum/constants/nets";


const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/027bb869b03f4456aa1e9d13aa1f6506');

const columns = [
    {id: 'blockNumber', label: 'Block',},
    {id: 'from', label: 'from',},
    {id: 'to', label: 'to',},
    {id: 'amount', label: 'amount',},
    {id: 'timestamp', label: 'timestamp',},
];

function createData(blockNumber, from, to, amount, timestamp) {
    return {blockNumber, from, to, amount, timestamp};
}


let rows = [
    createData('-', '-', '-', '-', '-'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: 15,
    },
    container: {
        width: '80vw',
        height: '95vh',
    },
});

export default function TransactionsHistory(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState({data: []});
    rows = Array.from(data);
    rows = rows.reverse();
    useEffect(() => {
            const fetchData = async () => {

                const result = await fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${props.address}`).then((res) => {
                        return res.json();
                    }
                );
                const data = [];
                result.result.forEach((item) => {
                    data.push({
                        blockNumber: item.blockNumber,
                        from: item.from,
                        to: item.to,
                        amount: `${web3.utils.fromWei(item.value)} ETH`,
                        timestamp: new Date(item.timeStamp * 1000).toLocaleString(),
                        hash: item.hash,
                    })
                });
                setData(data);
            };
            fetchData();
        }, []
    );

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
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow key={row.hash + index}>
                                    <TableCell component="th" scope="row">
                                        {row.blockNumber}
                                    </TableCell>
                                    <TableCell align="right">{row.from}</TableCell>
                                    <TableCell align="right">{row.to}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.timestamp}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}