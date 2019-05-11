import React, {Component} from 'react';
import Delete from "./Delete";
import Update from "./Update";

class Tr extends Component {

    renderNumber(num) {
        return ++num;
    }

    renderDeleteButton(index) {
        return (
            <Delete onClick={() => this.props.onClick(index)}/>
        )
    }

    renderUpdateButton(index) {
        return (
            <Update onClick={() => this.props.onClick(index)}/>
        )
    }


    render() {
        return (
            <tr>
                <td>{this.renderNumber(this.props.index)}</td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.pk}</td>
                <td>
                    {this.renderUpdateButton(this.props.index)}
                    {this.renderDeleteButton(this.props.index)}
                </td>
            </tr>
        )
    }
}

export default Tr;