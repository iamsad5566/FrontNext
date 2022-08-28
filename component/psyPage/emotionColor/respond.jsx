import React, { useState } from "react";
import Stimuli from "./stimuli";

const Respond = (props) => {
  const handleSumbit = props.handleSumbit;
  const [selected, setSelected] = useState([]);
  let stimuli = new Stimuli();

  const handleSelected = (string) => {
    let arr = [...selected];
    if (!arr.includes(string)) arr.push(string);
    else
      arr = arr.filter((s) => {
        if (s !== string) return s;
        else return "";
      });

    setSelected(arr);
  };

  let key = 0;

  return (
    <React.Fragment>
      <div style={{ marginTop: "10em", display: "block", textAlign: "center" }}>
        <h2>Please choose what you saw:</h2>
        <div style={{ marginTop: "2em" }}>
          {stimuli.neutral.map((stimulus) => {
            return (
              <button
                style={{
                  display: "inline-block",
                  margin: "1em",
                  borderWidth: "0",
                  color: selected.includes(stimulus) ? "red" : "black",
                }}
                onClick={() => {
                  handleSelected(stimulus);
                }}
                key={key++}
              >
                {" "}
                {stimulus}{" "}
              </button>
            );
          })}
        </div>

        <div>
          {stimuli.notShowed.map((stimulus) => {
            return (
              <button
                style={{
                  display: "inline-block",
                  margin: "1em",
                  borderWidth: "0",
                  color: selected.includes(stimulus) ? "red" : "black",
                }}
                onClick={() => {
                  handleSelected(stimulus);
                }}
                key={key++}
              >
                {" "}
                {stimulus}{" "}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "4em" }}> You have chosen: </div>
        {selected.length > 0 ? (
          <div style={{ marginTop: "1em" }}>
            <span
              style={{
                backgroundColor: "#A9A9A9",
                display: "inline-block",
                width: "55%",
              }}
            >
              {selected.map((s) => {
                return (
                  <span
                    style={{ margin: "1em", lineHeight: "3em" }}
                    key={key++}
                  >
                    {" "}
                    {s}{" "}
                  </span>
                );
              })}
            </span>
          </div>
        ) : (
          <></>
        )}
        <button
          className="btn btn-success"
          style={{ borderRadius: "30%", marginTop: "1em" }}
          onClick={handleSumbit}
        >
          {" "}
          submit{" "}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Respond;
