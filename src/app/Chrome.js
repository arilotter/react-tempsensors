import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import Link from "react-toolbox/lib/link";
import Navigation from "react-toolbox/lib/navigation";
import styles from "./Chrome.scss";
import holdStyles from "./ChromeHold.scss";
import classNames from "classnames";

const Chrome = props => (
  <AppBar
    fixed
    title="Temperature Control"
    theme={props.hold ? holdStyles : styles}
  >
    <Navigation type="horizontal">
      <Link
        label="Hold"
        icon={props.hold ? "pause_circle_filled" : "pause_circle_outline"}
        onTouchTap={props.doHold}
        className={props.hold ? styles.holdButton : ""}
        active={!!props.hold}
      />
    </Navigation>
  </AppBar>
);
export default Chrome;
