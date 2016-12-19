import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import HotterIcon from 'material-ui/svg-icons/content/add';
import ColderIcon from 'material-ui/svg-icons/content/remove';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Thermostats extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    console.log(this.state);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Thermostat />
          <Thermostat />
          <Thermostat />
        </div>
      </MuiThemeProvider>
    );
  }
}

class Thermostat extends React.Component {
  constructor (props) {
    super(props);

    this.changeQuantity = 0.5;
    this.state = {
      temperature: 0,
      label: 'Unnamed Room',
      setpoint: 0
    };
    this.style = {
      maxWidth: '20vw',
      margin: '8px'
    };

    this.changeSetpoint = this.changeSetpoint.bind(this);
    this.setSetpoint = this.setSetpoint.bind(this);
  }
  render () {
    return (
      <Paper style={this.style}>
        <div style={{
          width: '100%',
          textAlign: 'center',
          fontSize: '2em',
          padding: '8px'
        }}>{this.state.label}</div>
        <div style={{
          fontSize: '3em',
          textAlign: 'center',
          padding: '8px'
        }}>{this.state.setpoint}&deg;</div>
        <div style={{
          textAlign: 'center'
        }}>{this.state.temperature}&deg;</div>
        <div className='controls'>
          <FlatButton
            onClick={this.changeSetpoint(-1)}
            label='Colder'
            labelPosition='before'
            icon={<ColderIcon />}
          />
          <FlatButton
            onClick={this.changeSetpoint(+1)}
            label='Hotter'
            labelPosition='before'
            icon={<HotterIcon />}
            style={{float: 'right'}}
          />
        </div>
      </Paper>
    );
  }

  changeSetpoint (delta) {
    this.setSetpoint(this.state.setpoint + delta * this.changeQuantity);
  }

  setSetpoint (setpoint) {
    this.state.setpoint = setpoint;
    if (this.state.temperature >= this.state.setpoint) {

    }
  }
}

export default Thermostats;
