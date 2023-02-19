import { faHeart, faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faMicrophone,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import Player from "../Player/Player";
import styles from "./PlayerMusic.module.scss";

const cx = classNames.bind(styles);

function PlayerMusic() {
  const [currentSong, setCurrentSong] = useState({
    name: "Kìa Bóng Dáng Ai",
    url: "https://res.cloudinary.com/dicpaduof/video/upload/v1676731601/MP3/KiaBongDangAi_snlefg.mp3",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [loop, setLoop] = useState(false);

  const audioElem = useRef();

  useEffect(() => {
    if (audioElem.current) audioElem.current.volume = volume / 100;
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying, volume]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  const clickRef = useRef();
  const adjustVolume = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const progress = (offset / width) * 100;
    setVolume(Math.floor(progress));
  };

  const onMove = (e) => {
    var x = e.nativeEvent.locationX;
    var y = e.nativeEvent.locationY;
    console.log(x, y);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("media")}>
        <div className={cx("media-left")}>
          <img
            src={require("../images/img_music.jpg")}
            className={cx("image")}
          />
        </div>
        <div className={cx("media-content")}>
          <div className={cx("music-name")}>Kìa Bóng Dáng Ai</div>
          <div className={cx("singer-name")}>Pháo, Terry</div>
        </div>
        <div className={cx("media-right")}>
          <FontAwesomeIcon icon={faHeart} color="white" />
          <FontAwesomeIcon icon={faEllipsis} color="white" />
        </div>
      </div>
      <div className={cx("player-controls")}>
        <audio
          src={currentSong.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          loop={loop}
        />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioElem={audioElem}
          currentSong={currentSong}
        />
      </div>
      <div className={cx("right-actions")}>
        <div className={cx("wrapper-actions")}>
          <div className={cx("icon-action")}>
            <FontAwesomeIcon icon={faMicrophone} color="white" />
          </div>
          <div className={cx("icon-action")}>
            <FontAwesomeIcon icon={faWindowMaximize} color="white" />
          </div>
          <div className={cx("volume")}>
            <div className={cx("icon-volume")}>
              {volume > 65 ? (
                <FontAwesomeIcon icon={faVolumeHigh} color="white" />
              ) : volume <= 65 && volume > 0 ? (
                <FontAwesomeIcon icon={faVolumeLow} color="white" />
              ) : (
                <FontAwesomeIcon icon={faVolumeXmark} color="white" />
              )}
            </div>
            <div
              className={cx("volume-range")}
              onClick={adjustVolume}
              ref={clickRef}
            >
              <div
                className={cx("volume-current")}
                style={{ width: `${volume + "%"}` }}
              />
              <div className={cx("circle")} onTouchMove={onMove} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerMusic;
