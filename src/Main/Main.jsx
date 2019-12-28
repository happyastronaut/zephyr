import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SendIcon from '@material-ui/icons/Send';
import ReceiveIcon from '@material-ui/icons/CallReceived';
import ContactsIcon from '@material-ui/icons/Contacts';
import TransactionsIcon from '@material-ui/icons/ChangeHistory';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import Address from "../components/Address/Address";
import SendAsserts from "../components/SendAsserts/SendAsserts";
import TransactionsHistory from "../components/TransactionsHistory/TransactionsHistory";
import Settings from "../components/Settings/Settings";
import Receive from "../components/Receive/Receive";
import Contacts from "../components/Contacts/Contacts";
import Chart from "../components/Chart/Chart";

function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    tab: {
        width: '100%',
    },
    logout: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    content:{
        'background-color': '#acacac',
        width: '100%',
        height: '100%',
    }
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const account = props.account;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={2}>
                <Tabs
                    TabIndicatorProps={{style: {background: '#4e00ff'}}}
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                    centered={true}
                >
                    <Tab icon={<WalletIcon/>} label={'Wallet'} {...a11yProps(0)} />
                    <Tab icon={<SendIcon/>} label={'Send asserts'} className={classes.tab}{...a11yProps(1)} />
                    <Tab icon={<ReceiveIcon/>} label={'Recieve asserts'}  className={classes.tab} {...a11yProps(2)} />
                    <Tab icon={<ContactsIcon/>} label={'Contacts'} className={classes.tab} {...a11yProps(3)} />
                    <Tab icon={<TransactionsIcon/>} label={'Transactions'} className={classes.tab} {...a11yProps(4)} />
                    <Tab icon={<SettingsIcon/>} label={'Settings'} className={classes.tab}  {...a11yProps(5)} />
                    <Tab icon={<LogoutIcon/>} label={'Logout'} className={classes.logout}  disableRipple {...a11yProps(6)} />
                </Tabs>
            </Grid>
            <Grid className={classes.content} item xs>
                <TabPanel value={value} index={0}>
                    <div >123</div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SendAsserts
                        address={account.address}
                        privateKey={account.privateKey}
                        contactList={props.contactList}
                        enqueueSnackbar={props.enqueueSnackbar}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Receive address={account.address}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Contacts
                        contactList={props.contactList}
                        updateContacts={props.updateContacts}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <TransactionsHistory address={account.address}/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
            </Grid>
        </Grid>
    );
}