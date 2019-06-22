import React, {Component} from 'react';
import * as send from '../../ethereum/actions/sendTransaction'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {withStyles} from '@material-ui/styles';


const styles = {
    form: {
        padding: 20,
        margin: 100,
        width: 500,
        //height: 350,
    },
    titleRow: {
        padding: '0 0 10px 0',
    },
    title: {
        padding: '7px 0 0 0',
    },
    inputDiv: {
        padding: '0 0 8px 0',
    },
    input: {
        width: '100%',
        margin: '0 0 8px 0',
    },
    button: {
        width: '100%',
    },
    backButton: {
        margin: '0 0 0 175px',
    },
};

class SendAsserts extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            to: '',
            amount: '',
            gasPrice: undefined,
            gasLimit: undefined,
        };
    }



    async handleSubmit(event) {
        event.preventDefault();
        //0x2dDd58766120254a9Ebc4E7E2Cf4594a350abDeb
        const amount = this.state.amount.replace(',', '.');
        const res = await send.sendAsserts(this.props.address, this.props.privateKey, this.state.to, amount);
        console.log(res);
        if(res !== undefined){

            const action = (key) => (
                <div>
                    <Button onClick={() => { alert(`I belong to snackbar with key ${key}`); }}>
                        {'Alert'}
                    </Button>
                    <Button onClick={() => { props.closeSnackbar(key) }}>
                        {'Dismiss'}
                    </Button>
                </div>
            );

            this.props.enqueueSnackbar(`Transaction sent, id: ${res}`, {
                variant: 'success',
                action,
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (

            <Grid
                container
                spacing={24}
                justify="center"
                alignItems="center"
            >
                <Paper className={classes.form} elevation={5}>
                    <Grid container className={classes.titleRow}>
                        <Grid item xs>
                            <Typography
                                className={classes.title}
                                variant="h6"
                                color={"primary"}
                            >
                                Send Asserts
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="To"
                            variant="outlined"
                            type={'text'}
                            autoComplete={'true'}
                            onChange={e => this.setState({to: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Value"
                            variant="outlined"
                            type={'number'}
                            onChange={e => this.setState({amount: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Gas price"
                            variant="outlined"
                            onChange={e => this.setState({gasPrice: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Gas limit"
                            variant="outlined"
                            onChange={e => this.setState({gasLimit: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs >
                        <Button
                            className={classes.button}
                            variant="outlined"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Send
                        </Button>
                    </Grid>
                </Paper>
            </Grid>


        )
    }
}

export default withStyles(styles)(SendAsserts);

/*

                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor={'receiver'}>To:</label>
                            <input id={'receiver'}/>
                            <label htmlFor={'amount'}>Amount:</label>
                            <input id={'amount'}/>
                            <Button>Send</Button>
                        </form>

 */