import React, { useState } from "react";
import SemanticTrial from "./semanticTrial";

const StroopSemanticBlock = (props) => {
  const instruction =
    "在此階段中，請根據你所看到的/字詞的意思/，在每一個測驗中回答問題，並且愈快作答愈好，按下 go 按鍵後正式開始測驗。";
  let key = 0;
  const name = props.name;
  const [ready, setReady] = useState(false);
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
                if (sentence.includes("字詞的意思")) {
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
          <SemanticTrial
            name={name}
            handleMoveToNextBlock={handleMoveToNextBlock}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default StroopSemanticBlock;
