import React, {Component} from 'react';

import QRCode from 'qrcode-react';

class Receive extends Component {
    render() {
        return (
            <div>
                <QRCode value={this.props.address}/>
            </div>
        );
    }
}

export default Receive;



