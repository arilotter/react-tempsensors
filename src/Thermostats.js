import React from 'react';
import {deepOrange400, red900, amber400, grey100, grey900, white} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import HotterIcon from 'material-ui/svg-icons/content/add';
import ColderIcon from 'material-ui/svg-icons/content/remove';

import Particle from './Particle';

class Thermostats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {tmp: []};
  }
  componentDidMount () {
    this.startPolling();
  }

  componentWillUnmount () {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  startPolling () {
    setTimeout(() => {
      this.poll(); // run once before starting the timer
      this._timer = setInterval(this.poll.bind(this), 5000);
    }, 1);
  }

  poll () {
    window.fetch(`${Particle.endpoint}/temperatures?access_token=${Particle.accessToken}`)
      .then(response => {
        return response.json();
      }).then(json => {
        return Promise.resolve(JSON.parse(json.result));
      }).then(results => {
        this.setState(results);
      }).catch(err => {
        // TODO show some nice error
        console.log('parsing failed', err);
      });
  }

  render () {
    return (
      <div style={{
        textAlign: 'center'
      }}>
      {
        this.state.tmp.map(reading => {
          return <Thermostat key={reading.id} id={reading.id} label={this.props.labels[reading.id]} temperature={reading.actual} setpoint={reading.desired} />;
        })
      }
      </div>
    );
  }
}

class Thermostat extends React.Component {
  constructor (props) {
    super(props);

    this.changeQuantity = 0.5;
    this.state = {
      setpoint: props.setpoint
    };
    this.state.heating = this.props.temperature < this.state.setpoint;

    this.changeSetpoint = this.changeSetpoint.bind(this);
    this.setSetpoint = this.setSetpoint.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({setpoint: nextProps.setpoint});
  }

  render () {
    return (
      <Paper style={{
        maxWidth: '228px',
        margin: '8px',
        display: 'inline-block'
      }}>
        <div style={{
          width: 'calc(100% - 16px)',
          textAlign: 'center',
          fontSize: '2em',
          padding: '12px'
        }}>{this.props.label}</div>
        <div style={{
          fontSize: '2.2em',
          textAlign: 'center',
          padding: '8px'
        }}>
          <div className='temperature' style={{
            padding: '24px',
            background: (this.state.heating && `linear-gradient(0deg, ${red900} 0%, ${deepOrange400} 40%, ${deepOrange400} 60%, ${amber400} 100%)`) || grey100,
            color: (this.state.heating && white) || grey900,
            width: '64px',
            height: '64px',
            lineHeight: '64px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '64px'
          }}>{this.props.temperature}</div>
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: '1.3em'
        }}>
          <span>{(this.state.heating && <span>heating to</span>) || <span>set to</span>}</span>
          <span> {this.state.setpoint}&deg;</span>
        </div>
        <div>
          <FlatButton
            onClick={() => this.changeSetpoint(-1)}
            label='Colder'
            labelPosition='after'
            icon={<ColderIcon />}
          />
          <FlatButton
            onClick={() => this.changeSetpoint(+1)}
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
    if (setpoint < 0 || this.state.setpoint === setpoint) {
      return;
    }
    this.setState({setpoint});
    this.setState({heating: this.props.temperature < setpoint});
    window.fetch(`${Particle.endpoint}/setSetpoint`, {
      method: 'POST',
      body: new window.URLSearchParams(`access_token=${Particle.accessToken}&args=${this.props.id}${setpoint}`)
    }).catch(err => {
      // TODO some pretty error
      console.log('failed to set setpoint', err);
    });
  }
}

export default Thermostats;
