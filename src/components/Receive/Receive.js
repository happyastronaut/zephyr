import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import QRCode from 'qrcode-react';

const styles = {
    root: {
        height: 'auto',
        margin: 20,
    },
    header: {
        padding: '30px 0 0 0',
    },
    items: {
        padding: '100px 50px ',
    },
    qr: {
        margin: '0 0 0 30px'
    },
};

class Receive extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper elevation={5} className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.header} color={'primary'} align={"center"}
                                    variant={'h4'}>Recieve:</Typography>
                    </Grid>
                    <Grid container>
                        <Grid className={classes.items} item xs={6}>
                            <Typography color={'primary'} variant={'h6'}>Why use a QR code?</Typography>
                            <Typography align={'justify'}>
                                Ever sent assets to the wrong address because of an errant character in the
                                wallet address?

                                If not, lucky you - but it happens with frightening regularity.

                                We want to ensure people that pay you get your details right. You can
                                generate a QR code for requesting assets to help them help you.

                                Every code you generate will include your public wallet address, an asset amount and a
                                reference - all set by you.
                            </Typography>
                        </Grid>
                        <Grid className={classes.items} item xs={6}>
                            <div className={classes.qr}>
                                <QRCode size={250} value={`https://etherscan.io/address/${this.props.address}`}/>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Receive);



