import React from "react";

const Instruction = (props) => {
  const instruction =
    "Hello！實驗過程中，您會首先看到一串數列，請您記住此數列。接著，畫面中會接著跳出一些名人照片和人名，請您嘗試辨認出照片中的人與人名是否匹配——如果匹配，請盡你所能的迅速按下空白鍵；若否，則略過即可。待照片與人名的呈現結束後，會隨機呈現一個您在每一回合一開始見到的數列中的其中一個數字，請按下數字鍵以回答你所見到的那個數字的下一個數字為何。實驗共有兩個 Round，準備好後，按下按鈕便開始測驗。";
  const handleClick = props.handleClick;
  const styleForCentral = {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "3em 4em 0em 4em",
  };
  return (
    <React.Fragment>
      <div style={styleForCentral}>
        <div style={{ display: "block" }}>
          <h3 style={{ width: "100%", lineHeight: "1.5" }}>{instruction}</h3>
          <div style={{ textAlign: "center", marginTop: "5em" }}>
            <button className="btn btn-success" onClick={handleClick}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Instruction;
