import React, { useEffect, useState } from "react";
import StyleComponent from "../../styleComponents/styles";

const Timer = (props) => {
  let keyVal = 0;
  let style = new StyleComponent();
  const sentences = props.sentences;
  const pictureList = props.pictureList;
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(0);
  const [op, setOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 0.02);
      setOpacity((op) => op + 0.005);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  if (Math.floor(seconds) === 4) {
    setSeconds(0);
    setIndex((index) => index + 1);
    setOpacity(0);
  }

  if (index === 5) {
    setIndex(0);
  }

  var styleForPic = {
    opacity: op,
  };

  const styleForHide = {
    display: "none",
  };

  return (
    <React.Fragment>
      <div style={styleForHide}>
        {pictureList.map((picture) => {
          return <img key={keyVal++} src={picture.url} alt="qq" />;
        })}
      </div>
      <div className="col-sm" style={style.styleForFormat}>
        <img
          className="img-fluid"
          id="coverPic"
          src={pictureList[index].url}
          alt="qq"
          style={styleForPic}
        />
      </div>

      <div className="col-sm-4" style={style.styleForFont}>
        <p style={styleForPic}>{sentences[index]}</p>
      </div>
    </React.Fragment>
  );
};

export default Timer;
