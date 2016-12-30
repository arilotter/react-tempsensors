import React from 'react';
import classNames from 'classnames';
import Button from 'react-toolbox/lib/button';
import { Card } from 'react-toolbox/lib/card';
import Particle from './Particle';
import styles from './Thermostats.scss';

class Thermostats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {tmp: []};
  }
  componentDidMount () {
    this.poll();
  }

  componentWillUnmount () {
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  poll () {
    window.fetch(`${Particle.endpoint}/temperatures?access_token=${Particle.accessToken}`)
      .then(response => {
        return response.json();
      }).then(json => {
        return Promise.resolve(JSON.parse(json.result));
      }).then(results => {
        this.setState(results);
        this.pollTimer = setTimeout(this.poll.bind(this), 5000);
      }).catch(err => {
        this.setState({ tmp: [] });
        // If we failed to connect, wait a bit longer.
        this.pollTimer = setTimeout(this.poll.bind(this), 10000);
        console.error('Failed to load temperature data.', err);
      });
  }

  render () {
    if (this.state.tmp.length === 0) {
      return <p>Loading...</p>;
    }
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
      <Card className={styles.paper}>
        <h1 className={styles.roomLabel}>{this.props.label}</h1>
        <div className={classNames(
          styles.temperatureCircle,
          {[styles.heating]: this.state.heating}
        )}>{this.props.temperature}</div>
        <div className={styles.setpoint}>
          <span>{(this.state.heating && <span>heating to</span>) || <span>set to</span>}</span>
          <span> {this.state.setpoint}&deg;</span>
        </div>
        <div>
          <Button
            flat
            onTouchTap={() => this.changeSetpoint(-1)}
            label='Colder'
            icon='remove'
            className={styles.colderButton}
          />
          <Button
            flat
            onTouchTap={() => this.changeSetpoint(+1)}
            label='Hotter'
            icon='add'
            className={styles.hotterButton}
          />
        </div>
      </Card>
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
