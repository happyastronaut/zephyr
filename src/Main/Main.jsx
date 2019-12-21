import React, {Component} from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//import Tabs from '@material-ui/core/Tabs'
//import Tab from '@material-ui/core/Tab'
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

import {Tabs, Tab, TabPanel, TabList} from 'react-web-tabs';

import {withStyles} from '@material-ui/styles';

const styles = {
    wrapperDiv: {
        display: 'flex',
    },
    header: {
    },
    container: {
        height: '100vh',
    },
    tabList: {
        height: '100%',
    },
    logo: {
        margin: '30px auto',
    },
    logout: {
        margin: 'auto 0px 0px 0px',
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
    address: {
        'padding-top': '10px',
    },
    chart: {
        padding: '5px 0px 50px 0',

    },
};

class Main extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 1,
        };
    }

    render() {
        const account = this.props.account;
        const {classes} = this.props;
        console.log(this.props.account);
        return (
            <Grid>
                <Grid container className={classes.container}>

                    <Tabs defaultTab="vertical-tab-five" vertical>

                        <TabList className={classes.tabList}>
                            <Grid className={classes.logo}><WalletIcon/></Grid>
                            <Tab tabFor="vertical-tab-one"><WalletIcon/> </Tab>
                            <Tab tabFor="vertical-tab-two"><SendIcon/></Tab>
                            <Tab tabFor="vertical-tab-three"><ReceiveIcon/></Tab>
                            <Tab tabFor="vertical-tab-four"><ContactsIcon/></Tab>
                            <Tab tabFor="vertical-tab-five"><TransactionsIcon/></Tab>
                            <Tab tabFor="vertical-tab-six"><SettingsIcon/></Tab>
                            <Tab className={classes.logout} tabFor="vertical-tab-seven"><LogoutIcon/></Tab>
                        </TabList>

                        <TabPanel tabId="vertical-tab-one">
                            <Grid container spacing={0} className={classes.address}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Address
                                            enqueueSnackbar={this.props.enqueueSnackbar}
                                            address={account.address}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Chart/>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-two">
                            <SendAsserts
                                address={account.address}
                                privateKey={account.privateKey}
                                enqueueSnackbar={this.props.enqueueSnackbar}
                            />
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-three">
                            <Receive address={account.address}/>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-four">
                            <Contacts contactList={this.props.contactList}/>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-five">
                            <TransactionsHistory address={account.address}/>
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-six">
                        </TabPanel>

                        <TabPanel tabId="vertical-tab-seven">
                        </TabPanel>

                    </Tabs>

                </Grid>
            </Grid>


        );
    }
}


export default withStyles(styles)(Main);
