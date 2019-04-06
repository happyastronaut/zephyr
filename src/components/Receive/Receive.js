import React, {Component} from 'react';

import QRCode from 'qrcode-react';

class Receive extends Component {
    render() {
        return (
            <div>
                <QRCode size={200} value={this.props.address}/>
            </div>
        );
    }
}

export default Receive;



