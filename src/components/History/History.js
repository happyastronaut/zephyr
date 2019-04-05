import React, {Component} from 'react';

import Table from 'react-bootstrap/Table';
import {ropstenRpcURL} from "../../ethereum/constants/nets";


class History extends Component {

    constructor() {
        super();
        this.state = {
            history: [],
        };
    }

    componentDidMount() {
        this.getHistory();
    }

    async getHistory(address = '0x9Ce164439b504af1E0DcB092E1664c9136d7ed7e') {
        const data = await fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}`).then((res) => {
                return res.json();
            }
        );
        this.setState({
            history: data.result,
        });
    }

    render() {

        this.state.history.map(function (item, index) {
            //console.log(item);
        });

        return (
            <div>
                <Table striped bordered responsive="sm" hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Block</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.history.map(function (item, index) {
                            return (
                                <tr key={item.hash}>
                                    <td>{++index}</td>
                                    <td>{item.from}</td>
                                    <td>{item.to}</td>
                                    <td>{item.blockNumber}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default History;
