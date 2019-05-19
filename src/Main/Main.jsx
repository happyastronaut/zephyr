import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';

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
    container: {
        height: '100%',
        'background-color': '#ffffff',
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
        flexContainer: {
            flexDirection: 'column'
        },
        indicator: {
            display: 'none',
        },
        'background-color': '#e5eef9',
        height: '100%',
    },
};

class Main extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
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
            <Grid
                container
                className={classes.container}
            >
                <div className={classes.wrapperDiv}>
                    <div>
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

                    </div>
                    {activeIndex === 0 &&
                    <TabContainer>
                        <Address address={account.address}/>
                    </TabContainer>
                    }

                    {activeIndex === 1 &&
                    <TabContainer>
                        <SendAsserts/>
                    </TabContainer>
                    }

                    {activeIndex === 2 &&
                    <TabContainer>
                        <Receive/>
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

                </div>
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
