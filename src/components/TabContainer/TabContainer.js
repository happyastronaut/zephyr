import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography'

class TabContainer extends Component {
    render(){
        return(
            <Typography component="div" style={{ padding: 24 }}>
                {this.props.children}
            </Typography>
        )
    }
}

export default TabContainer;