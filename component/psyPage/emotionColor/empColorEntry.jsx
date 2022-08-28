import React, { useState } from "react";
import NavBar from "../../navbar";
import EmoManager from "./emoManager";
import Instruction from "./instruction";

const EmpColorEntry = () => {
  const [confrim, setConfirm] = useState(false);
  const handleConfirm = () => {
    setConfirm(true);
  };
  return (
    <React.Fragment>
      {confrim ? (
        <EmoManager />
      ) : (
        <React.Fragment>
          <NavBar />
          <Instruction handleConfirm={handleConfirm} />{" "}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EmpColorEntry;
