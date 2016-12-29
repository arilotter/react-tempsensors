import React from 'react';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import HotterIcon from 'material-ui/svg-icons/content/add';
import ColderIcon from 'material-ui/svg-icons/content/remove';
import Particle from './Particle';
import styles from './Thermostats.css';

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
      <div className={styles.container}>{
        this.state.tmp.map(reading => {
          return <Thermostat
            key={reading.id}
            id={reading.id}
            label={this.props.labels[reading.id]}
            temperature={reading.actual}
            setpoint={reading.desired}
          />;
        })
      }</div>
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
      <Paper className={styles.paper}>
        <div className={styles.roomLabel}>{this.props.label}</div>
        <div className={classNames(
          styles.temperatureCircle,
          {[styles.heating]: this.state.heating}
        )}>{this.props.temperature}</div>
        <div className={styles.setpoint}>
          <span>{(this.state.heating && <span>heating to</span>) || <span>set to</span>}</span>
          <span> {this.state.setpoint}&deg;</span>
        </div>
        <div>
          <FlatButton
            onTouchTap={() => this.changeSetpoint(-1)}
            label='Colder'
            labelPosition='after'
            icon={<ColderIcon />}
          />
          <FlatButton
            onTouchTap={() => this.changeSetpoint(+1)}
            label='Hotter'
            labelPosition='before'
            icon={<HotterIcon />}
            className={styles.hotterButton}
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
