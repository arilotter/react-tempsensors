import React from "react";
import Thermostat from "./Thermostat";
import styles from "./ThermostatsContainer.scss";

const Thermostats = props => (
  <div className={styles.container}>
    {props.temperatures.map(reading => (
      <Thermostat
        key={reading.id}
        id={reading.id}
        label={props.labels[reading.id]}
        temperature={reading.actual}
        setpoint={reading.desired}
        setSetpoint={setpoint => props.setSetpoint(reading.id, setpoint)}
      />
    ))}
  </div>
);
export default Thermostats;
