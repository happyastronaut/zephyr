import React, {Component} from 'react';

class Notification extends Component {
    render() {
        return(
            <p>{this.props.message}</p>
        )
    }
}


export default Notification;