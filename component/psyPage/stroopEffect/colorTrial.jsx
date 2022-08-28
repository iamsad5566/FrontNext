import React, { useEffect, useState } from "react";
import PsyGolangService from "../../../api/PsyGolangService";
import StroopStimuli from "./stroopStimuli";

let trial = 0;
const ColorTrial = (props) => {
  let totalTrails = 16;
  const conditionAddr = "color";
  const [result, setResult] = useState([]);
  const [question, setQuestion] = useState("藍色");
  const [questionColor, setQuestionColor] = useState("white");
  const [leftOption, setLeftOption] = useState({ string: "", color: "" });
  const [rightOption, setRightOption] = useState({ string: "", color: "" });

  const handleMoveToNextBlock = props.handleMoveToNextBlock;
  const name = props.name;
  let psyGolangService = new PsyGolangService();
  let stroopStimuli = new StroopStimuli();

  useEffect(() => {
    let stimuliList = stroopStimuli.colorArray;
    let listening = false;
    let counter = 0;
    let answered = false;

    let length = stimuliList.length;
    if (trial % 8 === 0) {
      stroopStimuli.randomShuffle(stimuliList);
    }

    const arr = [
      stimuliList[trial % length].target,
      stimuliList[trial % length].interference,
    ];
    if (trial % 2 === 0) {
      stroopStimuli.randomShuffle(arr);
    }

    const listener = (event) => {
      if (
        listening &&
        (event.key === "ArrowRight" || event.key === "ArrowLeft")
      ) {
        answered = true;
        let responseKey = "";
        if (event.key === "ArrowRight") {
          responseKey = arr[1].color;
        } else {
          responseKey = arr[0].color;
        }
        let correction = stroopStimuli.colorAnswer(
          stimuliList[trial % length].target.string,
          responseKey
        );

        let consistency = stroopStimuli.isConsistent(
          stimuliList[trial % length].target
        );

        let res = {
          trial: trial + 1,
          response: event.key,
          correction: correction,
          spent: counter,
          consistency: consistency,
        };

        let tmp = [...result];
        tmp.push(res);
        setResult(tmp);
        trial++;
        if (trial === totalTrails) {
          trial = 0;
          psyGolangService
            .updateStroopEffect(name, tmp, conditionAddr)
            .then((response) => {
              console.log(response.status);
            });
          handleMoveToNextBlock();
        }
      }
    };

    window.addEventListener("keydown", listener);

    const removeEvent = () => {
      window.removeEventListener("keydown", listener);
    };

    setQuestionColor("white");
    setQuestion(
      `請選擇顏色為『${stimuliList[trial % length].target.string}』的選項`
    );

    let countQuestion = setTimeout(() => {
      setQuestionColor("black");
    }, 500);

    let gap = setTimeout(() => {
      setQuestionColor("white");
      setQuestion("########");
    }, 2000);

    let countStimuli = setTimeout(() => {
      setLeftOption(arr[0]);
      setRightOption(arr[1]);
      listening = true;
      let clock = setInterval(() => {
        counter += 0.01;
        if (answered) {
          clearInterval(clock);
        }
      }, 10);
    }, 3000);

    return () => {
      clearTimeout(countQuestion);
      clearTimeout(gap);
      clearTimeout(countStimuli);
      removeEvent();
      setLeftOption({ string: "", color: "" });
      setRightOption({ string: "", color: "" });
    };
    // eslint-disable-next-line
  }, [result]);
  return (
    <React.Fragment>
      <div style={{ width: "90%", textAlign: "center" }}>
        <div
          style={{
            marginTop: "-4em",
            color: questionColor,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.5em",
          }}
        >
          {question}
        </div>
        <div></div>

        <div className="container" style={{ marginTop: "2em" }}>
          <div className="row justify-content-md-center">
            <div
              className="col"
              style={{
                textAlign: "right",
                fontWeight: "bold",
                color: leftOption.color,
                fontSize: "3em",
              }}
              id="option"
            >
              {leftOption.string}
            </div>
            <div
              className="col-2"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "3em",
              }}
            >
              +
            </div>
            <div
              className="col"
              style={{
                textAlign: "left",
                fontWeight: "bold",
                color: rightOption.color,
                fontSize: "3em",
              }}
              id="option"
            >
              {rightOption.string}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColorTrial;
