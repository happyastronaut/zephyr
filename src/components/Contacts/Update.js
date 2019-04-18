import React, {Component} from 'react';

class Update extends Component {
    render() {
        return (
            <button data-action={'update'} onClick={this.props.onClick}>
                Update
            </button>
        )
    }
}

export default Update;