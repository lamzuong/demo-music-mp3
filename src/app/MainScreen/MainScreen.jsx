import classNames from "classnames/bind";
import React from "react";
import PlayerMusic from "../PlayerMusic/PlayerMusic";
import styles from "./MainScreen.module.scss";

const cx = classNames.bind(styles);

function MainScreen(props) {
  return (
    <div className={cx("wrapper")}>
      <PlayerMusic />
    </div>
  );
}

export default MainScreen;
