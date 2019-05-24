import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import TabContainer from '../components/TabContainer/TabContainer';
import Address from "../components/Address/Address";
import Balance from "../components/Balance/Balance";
import SendAsserts from "../components/SendAsserts/SendAsserts";
import TransactionsHistory from "../components/TransactionsHistory/TransactionsHistory";
import Receive from "../components/Receive/Receive";
import Contacts from "../components/Contacts/Contacts";
import Chart from "../components/Chart/Chart";

import PersonPinIcon from '@material-ui/icons/PersonPin';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SendIcon from '@material-ui/icons/Send';
import ReceiveIcon from '@material-ui/icons/CallReceived';
import ContactsIcon from '@material-ui/icons/Contacts';
import TransactionsIcon from '@material-ui/icons/ChangeHistory';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import {withStyles} from '@material-ui/styles';

const styles = {
    wrapperDiv: {
        display: 'flex',
    },
    header: {
        // height: '10px',
    },
    container: {
        height: '100vh',

    },
    tab: {
        flexContainer: {
            flexDirection: 'column'
        },
        indicator: {
            display: 'none',
        },
    },
    tabs: {
        height: '100vh',
        width: '150px',
        backgroundColor: '#cbd6f9',
        flexContainer: {
            flexDirection: 'column'
        },
        indicator: {
            display: 'none',
        },
    },
    chart: {
        padding: '5px 0 50px 0',

    },
};

class Main extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 2,
        };
    }

    handleChange(_, activeIndex) {
        this.setState({activeIndex});
    }

    render() {
        const account = this.props.account;
        const {activeIndex} = this.state;
        const {classes} = this.props;
        return (
            <Grid>
                <Grid container className={classes.container}>
                    <Grid item xs={12} className={classes.wrapperDiv}>
                        <Grid item xs={2}>
                            <VerticalTabs
                                value={activeIndex}
                                onChange={this.handleChange.bind(this)}
                                className={classes.tabs}
                            >
                                <Tab className={classes.tab} label={'Wallet'} icon={<WalletIcon/>}/>
                                <Tab className={classes.tab} label={'Send'} icon={<SendIcon/>}/>
                                <Tab className={classes.tab} label={'Receive'} icon={<ReceiveIcon/>}/>
                                <Tab className={classes.tab} label={'Contacts'} icon={<ContactsIcon/>}/>
                                <Tab className={classes.tab} label={'Transactions'} icon={<TransactionsIcon/>}/>
                                <Tab className={classes.tab} label={'Settings'} icon={<SettingsIcon/>}/>
                                <Tab className={classes.tab} label={'Logout'} icon={<LogoutIcon/>}
                                     onClick={() => this.props.onLogoutClick()}/>
                            </VerticalTabs>
                        </Grid>

                        <Grid item xs={12}>
                            {activeIndex === 0 &&
                            <TabContainer>

                                <Grid container spacing={24}>
                                    <Grid item xs={8}>
                                        <Address
                                            enqueueSnackbar={this.props.enqueueSnackbar}
                                            address={account.address}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Balance address={account.address}/>
                                    </Grid>

                                </Grid>

                                <Grid item xs={12}>
                                    <Chart/>
                                </Grid>


                            </TabContainer>
                            }

                            {activeIndex === 1 &&
                            <TabContainer>
                                <SendAsserts/>
                            </TabContainer>
                            }

                            {activeIndex === 2 &&
                            <TabContainer>
                                <Receive address={account.address}/>
                            </TabContainer>
                            }

                            {activeIndex === 3 &&
                            <TabContainer>
                                <Contacts/>
                            </TabContainer>
                            }

                            {activeIndex === 4 &&
                            <TabContainer>
                                <TransactionsHistory address={account.address}/>
                            </TabContainer>
                            }

                            {activeIndex === 5 &&
                            <TabContainer>

                            </TabContainer>
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const VerticalTabs = withStyles({
    flexContainer: {
        flexDirection: 'column'
    },
    indicator: {
        display: 'none',
    },
})(Tabs);


export default withStyles(styles)(Main);
