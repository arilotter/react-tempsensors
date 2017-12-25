import React from "react";
import classNames from "classnames";
import Button from "react-toolbox/lib/button";
import { Card } from "react-toolbox/lib/card";
import styles from "./Thermostat.scss";

const Thermostat = props => {
  const isHeating = props.temperature < props.setpoint;
  return (
    <Card className={styles.paper}>
      <h1 className={styles.roomLabel}>{props.label}</h1>
      <div className={styles.temperatureIndicator}>{props.temperature}</div>
      <div className={styles.setpoint}>
        <span>
          {isHeating ? <span>heating to</span> : <span>set to</span>}&nbsp;
        </span>
        <span>{props.setpoint}&deg;</span>
      </div>
      <div>
        <Button
          flat
          onTouchTap={() => props.setSetpoint(props.setpoint - 0.5)}
          label="Colder"
          icon="remove"
          className={styles.colderButton}
        />
        <Button
          flat
          onTouchTap={() => props.setSetpoint(props.setpoint + 0.5)}
          label="Hotter"
          icon="add"
          className={styles.hotterButton}
        />
      </div>
      {isHeating ? (
        <div className={styles.waveContainer}>
          <div className={styles.wave} />
          <div className={styles.wave} />
          <div className={styles.wave} />
        </div>
      ) : null}
    </Card>
  );
};

export default Thermostat;
