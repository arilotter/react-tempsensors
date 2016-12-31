import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';

import styles from './Chrome.scss';

export default class Chrome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  render () {
    return (
      <div>
        <AppBar
          title='Temperature Control'
          rightIcon='refresh'
          onRightIconClick={this.props.doRefresh}
        />
      </div>
    );
  }
}
