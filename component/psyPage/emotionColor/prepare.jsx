import React from "react";

const Prepare = (props) => {
  const round = props.round;
  const handlReady = props.handlReady;

  const styleForMiddle = {
    margin: "auto",
    height: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <div style={{ display: "block", textAlign: "center" }}>
        <h1 style={{ color: "red", marginTop: "8em" }}>Round {round}</h1>
        <div style={styleForMiddle}>
          <div>
            <h2>Ready?</h2>
            <div style={{ marginTop: "1em", display: "block" }}></div>
            <button
              className="btn btn-primary"
              style={{ borderRadius: "20%" }}
              onClick={handlReady}
            >
              {" "}
              Go{" "}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Prepare;
