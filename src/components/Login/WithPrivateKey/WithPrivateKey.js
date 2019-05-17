import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {withStyles} from '@material-ui/styles';

const styles = {
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

class WithPrivateKey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: undefined,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.inputDiv}>
                    <TextField
                        className={classes.input}
                        label="0x"
                        variant="outlined"
                        type={'password'}
                        onChange={e => this.setState({privateKey: e.target.value})}
                    />
                </div>

                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => this.props.onLoginClickPrivateKey(this.state.privateKey)}>
                    Login
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(WithPrivateKey);