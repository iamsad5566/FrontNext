import React, { useEffect, useState } from "react";
import Stimuli from "./stimuli";
var secs = 1000;

const Experiment = (props) => {
  const [presentation, setPresentation] = useState("");
  const [currTrial, setCurrTrial] = useState(1);
  const handleDone = props.handleDone;
  const trials = props.trials;

  const condition = ["red", "green", "blue"];
  const conditionIndex = props.round;

  let stimuli = new Stimuli();

  useEffect(() => {
    let curr = 1;
    let index = 0;

    setPresentation("+");

    setTimeout(() => {
      setPresentation(stimuli.neutral[index]);
    }, secs);

    index++;

    let trial = setInterval(() => {
      if (curr < trials) {
        setCurrTrial(0);
        setPresentation("+");

        setTimeout(() => {
          setCurrTrial(curr);
          setPresentation(stimuli.neutral[index]);
        }, secs);

        curr++;
        index++;
      } else {
        clearInterval(trial);
        handleDone();
      }
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const styleForMiddle = {
    margin: "auto",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };
  return (
    <React.Fragment>
      <div style={styleForMiddle}>
        {currTrial === 4 ? (
          <h1 style={{ color: condition[conditionIndex % condition.length] }}>
            {presentation}
          </h1>
        ) : (
          <h1>{presentation}</h1>
        )}
      </div>
    </React.Fragment>
  );
};

export default Experiment;
