import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonBase from '@material-ui/core/ButtonBase';

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

