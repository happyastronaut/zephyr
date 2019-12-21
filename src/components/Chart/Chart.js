import React, {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';

const styles = {
    container: {
        marginTop: '24px',
        height: '70vh',
    },
    header: {
        padding: '15px 0 0 25px',
        margin: '15px',
    },
    chartContainer: {
        height: '90%',
        padding: 15,
    },
};

class Chart extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            lastPrice: 0,
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const data = await fetch('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=12&aggregate=1&e=Kraken&extraParams=your_app_name');
        //https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistohour
        const jsonData = await data.json();
        const selected = jsonData.Data.map(item => {
            return {
                time: `${new Date(item.time * 1000).getHours()}:00`,
                price: item.close,
            }
        });
        await this.setState({
            data: selected,
            lastPrice: selected[length].price,
        });
    }

    //http://recharts.org/en-US/examples/AreaResponsiveContainer
    render() {
        const {classes} = this.props;
        return (
            <Paper elevation={5}>
                <Grid container className={classes.container}>

                    <Grid item xs={12} className={classes.header}>
                        <Typography align={"left"} variant={'h5'}>Market
                            price: {this.state.lastPrice}$</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.chartContainer}>
                        <ResponsiveContainer>
                            <AreaChart
                                data={this.state.data}
                                margin={{
                                    top: 10, right: 30, left: 0, bottom: 40,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="time"/>
                                <YAxis domain={['dataMin', 'dataMax']}/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8"/>
                                <Tooltip/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </Grid>

                </Grid>

            </Paper>
        )
    }

}

export default withStyles(styles)(Chart);