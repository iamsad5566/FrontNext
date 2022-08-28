import React, { useState } from "react";
import NavBar from "../../navbar";
import BlockController from "./blockController";
import Instruction from "./instruction";

const SelectiveAttentionEntry = () => {
  const [confirm, setConfirm] = useState(false);
  const handleClick = () => {
    setConfirm(true);
  };
  return (
    <React.Fragment>
      {!confirm ? (
        <React.Fragment>
          <NavBar />
          <Instruction handleClick={handleClick} />
        </React.Fragment>
      ) : (
        <BlockController />
      )}
    </React.Fragment>
  );
};

export default SelectiveAttentionEntry;
