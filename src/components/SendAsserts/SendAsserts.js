import React, {Component} from 'react';
import * as send from '../../ethereum/actions/sendTransaction'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {withStyles} from '@material-ui/styles';


const styles = {
    container: {
        width: '100%',
    },
    form: {
        padding: '25px 10px',
        margin: '50px 100px',
        width: 'auto',
        height: 'auto'
    },
    titleRow: {
        padding: '0 0 10px 0',
    },
    title: {
        padding: '7px 0 0 0',
    },
    inputDiv: {
        padding: '0 0 15px 0',
    },
    input: {
        width: '100%',
    },
    button: {
        width: '100%',
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
        if (this.state.to === '' || this.state.amount === '') {
            this.props.enqueueSnackbar(`All fields required`, {
                variant: 'error',
            });
            return;
        }
        const amount = this.state.amount.replace(',', '.');
        let res;
        try {
            res = await send.sendAsserts(this.props.address, this.props.privateKey, this.state.to, amount);
        } catch (e) {
            this.props.enqueueSnackbar(`Error: ${e}`, {
                variant: 'error',
            });
            return;
        }
        console.log(res);
        if (res !== undefined && res !== null) {
            const action = (key) => (
                <div>
                    <Button onClick={() => {
                        alert(`I belong to snackbar with key ${key}`);
                    }}>
                        {'Alert'}
                    </Button>
                    <Button onClick={() => {
                        props.closeSnackbar(key)
                    }}>
                        {'Dismiss'}
                    </Button>
                </div>
            );
            this.props.enqueueSnackbar(`Transaction sent, id: ${res}`, {
                variant: 'success',
                action,
            });
        }
        else {
            this.props.enqueueSnackbar(`Transaction error`, {
                variant: 'error',
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.form} elevation={5}>

                <Grid
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <Grid item xs className={classes.titleRow}>
                        <Grid item xs={12}>
                            <Typography
                                className={classes.title}
                                variant="h6"
                                color={"primary"}
                            >
                                Send Asserts
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="To"
                            type={'text'}
                            autoComplete={'true'}
                            onChange={e => this.setState({to: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12} className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Value"
                            type={'number'}
                            onChange={e => this.setState({amount: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Gas price"
                            onChange={e => this.setState({gasPrice: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.inputDiv}>
                        <TextField
                            className={classes.input}
                            label="Gas limit"
                            onChange={e => this.setState({gasLimit: e.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="outlined"
                            onClick={this.handleSubmit}
                        >
                            Send
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
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


/*


 */