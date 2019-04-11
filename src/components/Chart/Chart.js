import React, {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

class Chart extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
        }
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
        this.setState({
            data: selected,
        });
    }

    //http://recharts.org/en-US/examples/AreaResponsiveContainer
    render() {
        return (
            <div style={{ width: '100%', height: 300 }}>
                <h3>ETH price chart</h3>
                <ResponsiveContainer>
                    <AreaChart
                        data={this.state.data}
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
                        <Tooltip/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        )
    }

}

export default Chart;