import React from "react";
import Chrome from "./Chrome";
import ThermostatsContainer from "./ThermostatsContainer";
import Particle from "./Particle";

import styles from "./App.scss";

const labels = {
  "0": "Jo's Room",
  "1": "Ari's Room",
  "2": "Jade's Room",
  "3": "Shop",
  "4": "Living Room",
  "5": "Bathroom"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tmp: []
    };
    this.setSetpoint = this.setSetpoint.bind(this);
    this.cancelPollTimer = this.cancelPollTimer.bind(this);
    this.doRefresh = this.doRefresh.bind(this);
    this.doHold = this.doHold.bind(this);
  }

  cancelPollTimer() {
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  componentDidMount() {
    this.poll();
  }

  componentWillUnmount() {
    this.cancelPollTimer();
  }

  doRefresh() {
    this.cancelPollTimer();
    this.poll();
  }

  doHold() {
    const newHoldValue = (!this.state.hold) ? 1 : 0;
    this.setState({hold: newHoldValue}); // update client-side
    window
    .fetch(`${Particle.endpoint}/setHold`, {
      method: "POST",
      body: new window.URLSearchParams(
        `access_token=${Particle.accessToken}&args=${newHoldValue}`
      )
    })
    .catch(err => {
      console.log("failed to set setpoint", err);
    });
  }

  poll() {
    window
      .fetch(
        `${Particle.endpoint}/temperatures?access_token=${Particle.accessToken}`
      )
      .then(response => response.json())
      .then(json => {
        const results = JSON.parse(json.result);
        this.setState(results);
        this.pollTimer = setTimeout(this.poll.bind(this), 5000);
        console.log("loaded data successfully");
      })
      .catch(err => {
        this.setState({ tmp: [] });
        // If we failed to connect, wait a bit longer.
        this.pollTimer = setTimeout(this.poll.bind(this), 10000);
        console.error("Failed to load temperature data.", err);
      });
  }

  setSetpoint(id, setpoint) {
    if (setpoint < 0) {
      return;
    }
    const newTemperatures = this.state.tmp.slice();
    newTemperatures[id].desired = setpoint;
    this.setState({ tmp: newTemperatures });
    window
      .fetch(`${Particle.endpoint}/setSetpoint`, {
        method: "POST",
        body: new window.URLSearchParams(
          `access_token=${Particle.accessToken}&args=${id}${setpoint}`
        )
      })
      .catch(err => {
        console.log("failed to set setpoint", err);
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <Chrome
          doRefresh={this.doRefresh}
          doHold={this.doHold}
          hold={this.state.hold}
        />
        <ThermostatsContainer
          labels={labels}
          temperatures={this.state.tmp}
          setSetpoint={this.setSetpoint}
        />
      </div>
    );
  }
}

export default App;
