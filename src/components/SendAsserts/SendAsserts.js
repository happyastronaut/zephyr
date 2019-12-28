import React, {useState} from 'react';
import * as send from '../../ethereum/actions/sendTransaction'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Autocomplete} from '@material-ui/lab';

import {makeStyles} from '@material-ui/core/styles';
import {ropstenRpcURL} from "../../ethereum/constants/nets";

const Web3 = require('web3');
const web3 = new Web3(ropstenRpcURL);

const useStyles = makeStyles(theme => ({
    container: {
        width: '50vw',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    paper: {
        margin: '50px 20px',
        width: '100%'
    },
    title: {
        padding: '20px 40px 0 40px',
    },
    field: {
        padding: '0px 40px 10px 40px',
        'vertical-align': 'middle',
    },
    button: {
        margin: '40px 0 0 80px',
        width: '100%',
        height: 80,
    },

}));

export default function SendAsserts(props) {
    const classes = useStyles();
    const contactList = props.contactList;
    const [address, setAddress] = useState(0);
    const [amount, setAmount] = useState(0);
    const [gasPrice, setGasPrice] = useState(10);
    const [gasLimit, setGasLimit] = useState(21000);
    return (
        <Grid container
              className={classes.container}
              direction="row"
              justify="center"
              alignItems="center"
        >
            <Paper
                elevation={5}
                className={classes.paper}
            >
                <Typography
                    variant="h6"
                    color={"primary"}
                    className={classes.title}
                >
                    Send asserts
                </Typography>
                <Autocomplete
                    id="to-address"
                    className={classes.field}
                    freeSolo
                    options={contactList.map(option => option.name)}
                    disableClearable
                    renderInput={params => (
                        <TextField {...params} label="To:" margin="normal" onChange={e => {setAddress(e.target.value)}} fullWidth/>
                    )}
                    onChange={handleChange}
                />
                <div className={classes.field}>
                    <TextField
                        id="amount"
                        label="Amount"
                        type={'number'}
                        fullWidth
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>
                <Grid container className={classes.field} spacing={5}>
                    <Grid item xs={6}>
                        <TextField
                            id="gasprice"
                            label="Gas price"
                            type={'number'}
                            defaultValue={'10'}
                            fullWidth
                            onChange={e => setGasPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="gaslimit"
                            label="Gas limit"
                            type={'number'}
                            defaultValue={'21000'}
                            fullWidth
                            onChange={e => setGasLimit(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={(e) => {
                        handleSubmit(e)
                    }}>
                    Send
                </Button>
            </Paper>

        </Grid>
    );

    async function handleSubmit(event) {
         event.preventDefault();
         console.log(address, amount, gasPrice, gasLimit);
        //0x2dDd58766120254a9Ebc4E7E2Cf4594a350abDeb
        if (address === '' || amount === '') {
            props.enqueueSnackbar(`All fields required`, {
                variant: 'error',
            });
            return;
        }
        if (!web3.utils.isAddress(address)){
            props.enqueueSnackbar(`Invalid address`, {
                variant: 'error',
            });
            return;
        }
        setAmount(amount.replace(',', '.'));
        let res;
        try {
            res = await send.sendAsserts(props.address, props.privateKey, address, amount.toString(), gasPrice.toString(), gasLimit.toString());
        } catch (e) {
            props.enqueueSnackbar(`Error: ${e}`, {
                variant: 'error',
            });
            return;
        }
        console.log(res);
        if (res !== undefined && res !== null) {
            props.enqueueSnackbar(`Transaction sent, id: ${res}`, {
                variant: 'success',
            });
        }
        else {
            props.enqueueSnackbar(`Transaction error`, {
                variant: 'error',
            });
        }
    }

    function handleChange(event, newValue) {
        setAddress(contactList.find(x => x.name === newValue).address);
    }

}