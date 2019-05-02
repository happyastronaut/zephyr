import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Main from './main';

import * as accountActions from './ethereum/actions/createWallet';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: undefined,
            redirect: false,
            accountObj: undefined,
            error: "",
        };
    }

    handleOnClick() {
        console.log(this.state.address);
        let wallet = undefined;
        try {
            wallet = accountActions.createAccFromPK(this.state.address);
            console.log(wallet);
            this.setState({
                redirect: true,
                accountObj: wallet,
            });
        }
        catch (e) {
            console.log("error");
            this.setState({
                error: "error",
            });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Main account={this.state.accountObj}/>
        }
        return (
            <div>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <Grid item xs={6}>
                        0x<Input onChange={e => this.setState({address: e.target.value})}/>
                        <Button variant="outlined" color="primary" onClick={this.handleOnClick.bind(this)}>Login</Button>
                        <p>{this.state.error}</p>
                        <p>7cc936b609b30ad652a5fe88c0574a6ec63f9e2d577f577acdd935100bf37af9</p>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default Login;

