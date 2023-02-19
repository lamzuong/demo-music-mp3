import {
  faCirclePause,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import styles from "./Player.module.scss";

const cx = classNames.bind(styles);

function Player({
  audioElem,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  songs,
  currentVolume,
}) {
  const clickRef = useRef();
  const PlayPause = () => setIsPlaying(!isPlaying);

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const progress = (offset / width) * 100;
    audioElem.current.currentTime = (progress / 100) * currentSong.length;
  };

  const minuteCurrent = () => {
    if (audioElem.current)
      return Math.floor(audioElem.current.currentTime / 60);
    return "0";
  };
  const secondCurrent = () => {
    if (audioElem.current)
      return Math.floor(audioElem.current.currentTime % 60);
    return "0";
  };
  const minuteTotal = () => {
    if (currentSong.length) return Math.floor(currentSong.length / 60);
    return "0";
  };
  const secondTotal = () => {
    if (currentSong.length) return Math.floor(currentSong.length % 60);
    return "0";
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top-side")}>
        <div className={cx("button")}>
          <FontAwesomeIcon icon={faShuffle} color={"white"} size="lg" />
        </div>
        <div className={cx("button")}>
          <FontAwesomeIcon icon={faBackwardStep} color={"white"} size="lg" />
        </div>

        {isPlaying ? (
          <div className={cx("button")} onClick={PlayPause}>
            <FontAwesomeIcon icon={faCirclePause} color={"white"} size="2xl" />
          </div>
        ) : (
          <div className={cx("button")} onClick={PlayPause}>
            <FontAwesomeIcon icon={faPlayCircle} color={"white"} size="2xl" />
          </div>
        )}

        <div className={cx("button")}>
          <FontAwesomeIcon icon={faForwardStep} color={"white"} size="lg" />
        </div>
        <div className={cx("button")}>
          <FontAwesomeIcon icon={faRepeat} color={"white"} size="lg" />
        </div>
      </div>
      <div className={cx("bottom-side")}>
        <div className={cx("time")}>
          {minuteCurrent() < 10 ? `0${minuteCurrent()}` : minuteCurrent()}:
          {secondCurrent() < 10 ? `0${secondCurrent()}` : secondCurrent()}
        </div>
        <div className={cx("entire-bar")} onClick={checkWidth} ref={clickRef}>
          <div
            className={cx("action-bar")}
            style={{ width: `${currentSong.progress + "%"}` }}
          />
          <div className={cx("circle")} />
        </div>
        <div className={cx("time")}>
          {minuteTotal() < 10 ? `0${minuteTotal()}` : minuteTotal()}:
          {secondTotal() < 10 ? `0${secondTotal()}` : secondTotal()}
        </div>
      </div>
    </div>
  );
}

export default Player;
