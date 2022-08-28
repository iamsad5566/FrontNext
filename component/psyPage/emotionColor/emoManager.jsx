import React, { useState } from "react";
import Experiment from "./experiment";
import Prepare from "./prepare";
import Respond from "./respond";
import Stimuli from "./stimuli";

const EmoManager = () => {
  const [round, setRound] = useState(1);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  let stimuli = new Stimuli();

  const trials = 7;

  const handleDone = () => {
    setDone(true);
    setRound((round) => round + 1);
  };

  const handlReady = () => {
    stimuli.randomShuffle(stimuli.neutral);
    setReady(true);
  };

  const handleSumbit = () => {
    setReady(false);
    setDone(false);
  };

  return (
    <React.Fragment>
      {ready ? (
        done ? (
          <Respond handleSumbit={handleSumbit} />
        ) : (
          <Experiment trials={trials} handleDone={handleDone} round={round} />
        )
      ) : (
        <Prepare round={round} handlReady={handlReady} />
      )}
    </React.Fragment>
  );
};

export default EmoManager;
