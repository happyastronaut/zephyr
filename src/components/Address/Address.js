import React, {Component} from 'react';

class Address extends Component {
    render() {
        return (
            <div>
                <p>My public address: {this.props.address}</p>
            </div>
        );
    }
}

export default Address;

