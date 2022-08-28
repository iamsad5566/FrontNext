import React, { useState } from "react";
import ColorTrial from "./colorTrial";

/*
    Procedure: 指導語，呈現 5~10 秒，提醒受試者準備。
    在這個階段中，請選出你所看到的字的顏色

*/

const StroopColorBlock = (props) => {
  const instruction =
    "在此階段中，請根據你所看到的/字詞的顏色/，在每一個測驗中回答問題，並且愈快作答愈好，按下 go 按鍵後正式開始測驗。";
  let key = 0;
  const [ready, setReady] = useState(false);
  const name = props.name;
  let handleMoveToNextBlock = props.handleMoveToNextBlock;

  const handleReady = () => {
    setReady(true);
  };

  const styleForCenter = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <React.Fragment>
      <div style={styleForCenter}>
        {!ready ? (
          <div
            style={{
              display: "block",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2em",
            }}
          >
            <div style={{ textAlign: "justify" }}>
              {instruction.split("/").map((sentence) => {
                if (sentence.includes("字詞的顏色")) {
                  return (
                    <span
                      style={{ display: "inline", color: "red" }}
                      key={key++}
                    >
                      {sentence}
                    </span>
                  );
                }

                return <span key={key++}>{sentence}</span>;
              })}
            </div>
            <div style={{ marginTop: "1em" }}></div>
            <button
              className="btn btn-danger"
              style={{ borderRadius: "50%" }}
              onClick={handleReady}
            >
              {" "}
              Go{" "}
            </button>
          </div>
        ) : (
          <ColorTrial
            name={name}
            handleMoveToNextBlock={handleMoveToNextBlock}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default StroopColorBlock;
