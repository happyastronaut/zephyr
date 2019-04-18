import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {ropstenRpcURL} from "../../ethereum/constants/nets";
import Notification from "../Notification/Notification";

const Web3 = require('web3');
const web3 = new Web3(ropstenRpcURL);

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="down" {...props} />;
}


class ContactDialog extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            name: '',
            address: '',
            error: false,
            errorMessage: '',
        };
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleSave() {
        const item = {
            name: this.state.name,
            address: this.state.address,
        };

        if (item.name) {
            if (web3.utils.isAddress(item.address)) {
                if (!this.props.list.some(el => el.address === item.address)) {
                    this.props.onClick(item);
                    this.setState({
                        name: '',
                        address: '',
                        open: false,
                        error: false,
                        errorMessage: '',
                    });
                } else {
                    this.setState({
                        error: true,
                        errorMessage: "Address is already in list ",
                    });
                }
            } else {
                this.setState({
                    error: true,
                    errorMessage: "Not address",
                });
            }
        } else {
            this.setState({
                error: true,
                errorMessage: "Empty name",
            });
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <div>

                <Button variant="outlined" color="primary" onClick={() => {
                    this.handleClickOpen()
                }}>
                    Add contact
                </Button>

                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => this.handleClose()} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                New contact
                            </Typography>
                            <Button color="inherit" onClick={() => this.handleSave()}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <FormControl className={'ml-3 mr-3 mt-5'}>
                        <TextField
                            className={'mt-5'}
                            label="Contact's name"
                            variant="outlined"
                            id="contacts-name"
                            value={this.state.name}
                            onChange={e => this.setState({name: e.target.value})}
                        />
                        <TextField
                            className={'mt-3'}
                            label="Contact's address"
                            variant="outlined"
                            id="contacts-address"
                            value={this.state.address}
                            onChange={e => this.setState({address: e.target.value})}
                        />
                    </FormControl>
                    {this.state.error ? <Notification message={this.state.errorMessage}/> : null}
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(ContactDialog);
