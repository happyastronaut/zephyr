import React, {Component} from 'react';

class Delete extends Component {
    render() {
        return (
            <button data-action={'delete'} onClick={this.props.onClick}>
                Delete
            </button>
        )
    }
}

export default Delete;