import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import Link from "react-toolbox/lib/link";
import Navigation from "react-toolbox/lib/navigation";
import styles from "./Chrome.scss";

const Chrome = props => (
  <AppBar title="Temperature Control" theme={styles}>
    <Navigation type="horizontal">
      <Link
        label="Hold"
        icon={props.hold ? "pause_circle_filled" : "pause_circle_outline"}
        onClick={props.doHold}
        className={props.hold ? styles.holdButton : ''}
        active={!!props.hold}
      />
      <Link label="Refresh" icon="refresh" onClick={props.doRefresh} />
    </Navigation>
  </AppBar>
);
export default Chrome;
