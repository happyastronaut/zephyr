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

class FullScreenDialog extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
        };
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
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
                            <Button color="inherit" onClick={() => this.handleClose()}>
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
                        />
                        <TextField
                            className={'mt-3'}
                            label="Contact's address"
                            variant="outlined"
                            id="contacts-address"
                        />
                    </FormControl>

                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(FullScreenDialog);
