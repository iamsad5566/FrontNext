import React, { useEffect, useState } from "react";
import SelectiveStimuli from "./selectiveStimuli";
import Tools from "./tools";

const Block = (props) => {
  const trialNum = props.trialNum;
  const prefix = "/SelectiveAttention/";
  const [fixation, setFixation] = useState("");
  const [picture, setPicture] = useState("");
  const [stimIndex, setStimIndex] = useState(0);
  const [switcher, setSwitcher] = useState({
    memorySet: "none",
    picture: "none",
  });
  const [text, setText] = useState("");
  const [probe, setProbe] = useState({
    num: -1,
    display: "none",
  });

  let expStimuli = new SelectiveStimuli();
  let tools = new Tools();
  let stimuliList = expStimuli.stimuli;
  let memorySet = expStimuli.numberArr;

  let memoryStorage = (arr) => {
    let output = [];
    for (let i = 0; i < arr.length - 1; i++) {
      output.push(arr[i]);
    }

    return output;
  };

  let condition = [];
  for (let i = 0; i < trialNum / 3; i++) {
    condition = condition.concat([...expStimuli.condition]);
  }

  useEffect(() => {
    const picArr = [...expStimuli.female].concat([...expStimuli.male]);
    picArr.forEach((img) => {
      const newImg = new Image();
      newImg.src = "/SelectiveAttention/" + img + ".png";
      window[img] = newImg;
    });

    // Initialize
    let listening = false;
    let trial = props.currTrial;
    let handleNextTrial = props.handleNextTrial;
    let handleNextRound = props.handleNextRound;

    // Randomised
    tools.randomShuffle(stimuliList);
    tools.randomizeCondition(condition[trial], "target");
    if (props.level === "hard") {
      tools.randomShuffle(memorySet);
    }
    let storage = memoryStorage(memorySet);

    // Event listener
    const handlePress = (event) => {
      if (
        listening &&
        (event.key === "1" ||
          event.key === "2" ||
          event.key === "3" ||
          event.key === "4" ||
          event.key === "0")
      ) {
        if (trial < trialNum - 1) handleNextTrial();
        else handleNextRound();
      }
    };

    window.addEventListener("keypress", handlePress);
    let removeEvent = () => {
      window.removeEventListener("keypress", handlePress);
    };

    if (trial % 4 === 0) {
      tools.randomShuffle(storage);
    }

    if (trial === 0) {
      setFixation("Round " + props.currIndex);
    }

    let milliSec = 0;
    // Round count down
    let countDown = () => {};

    if (trial === 0) {
      milliSec += 3000;
      countDown = setTimeout(() => {
        setFixation("");
      }, milliSec);
    }

    // Start
    // Fixation
    milliSec += 1000;
    countDown = setTimeout(() => {
      setFixation("+");
    }, milliSec);

    // MemorySet
    milliSec += 500;
    countDown = setTimeout(() => {
      setFixation("");
      setSwitcher({
        memorySet: "",
        picture: "none",
      });
    }, milliSec);

    // Show up fixation again
    milliSec += 1500;
    countDown = setTimeout(() => {
      setSwitcher({
        memorySet: "none",
        picture: "none",
      });
      setFixation("+");
    }, milliSec);

    // Show up images
    milliSec += 850;

    switch (condition[trial].length) {
      case 2:
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][0] === "distraction") {
            let arr = stimuliList[stimIndex % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[stimIndex % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix + stimuliList[stimIndex % stimuliList.length].target + ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);

        // Second picture
        milliSec += 1250;
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][1] === "distraction") {
            let arr =
              stimuliList[(stimIndex + 1) % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[(stimIndex + 1) % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix +
              stimuliList[(stimIndex + 1) % stimuliList.length].target +
              ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);
        break;

      case 3:
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][0] === "distraction") {
            let arr = stimuliList[stimIndex % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[stimIndex % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix + stimuliList[stimIndex % stimuliList.length].target + ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);

        // Second picture
        milliSec += 1250;
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][1] === "distraction") {
            let arr =
              stimuliList[(stimIndex + 1) % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[(stimIndex + 1) % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix +
              stimuliList[(stimIndex + 1) % stimuliList.length].target +
              ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);

        // Third picture
        milliSec += 1250;
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][2] === "distraction") {
            let arr =
              stimuliList[(stimIndex + 2) % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[(stimIndex + 2) % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix +
              stimuliList[(stimIndex + 2) % stimuliList.length].target +
              ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);
        break;

      case 4:
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][0] === "distraction") {
            let arr = stimuliList[stimIndex % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[stimIndex % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix + stimuliList[stimIndex % stimuliList.length].target + ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);

        // Second picture
        milliSec += 1250;
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][1] === "distraction") {
            let arr =
              stimuliList[(stimIndex + 1) % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[(stimIndex + 1) % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix +
              stimuliList[(stimIndex + 1) % stimuliList.length].target +
              ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);

        // Third picture
        milliSec += 1250;
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][2] === "distraction") {
            let arr =
              stimuliList[(stimIndex + 2) % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[(stimIndex + 2) % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix +
              stimuliList[(stimIndex + 2) % stimuliList.length].target +
              ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);

        // Fourth picture
        milliSec += 1250;
        countDown = setTimeout(() => {
          let name = "";
          if (condition[trial][3] === "distraction") {
            let arr =
              stimuliList[(stimIndex + 3) % stimuliList.length].distraction;
            name = arr[tools.randomSelect(arr.length)];
          } else {
            name = stimuliList[(stimIndex + 3) % stimuliList.length].target;
          }

          setText(name);
          setPicture(
            prefix +
              stimuliList[(stimIndex + 3) % stimuliList.length].target +
              ".png"
          );
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "",
          });
          setStimIndex((stimIndex) => stimIndex + 1);
        }, milliSec);

        // Response time
        milliSec += 500;
        countDown = setTimeout(() => {
          setText("");
          setFixation("");
          setSwitcher({
            memorySet: "none",
            picture: "none",
          });
        }, milliSec);
        break;

      default:
        break;
    }

    // Wait for response and present probe
    milliSec += 1250;
    countDown = setTimeout(() => {
      setSwitcher({
        memorySet: "none",
        picture: "none",
      });
      setProbe({
        num: storage[trial % storage.length],
        display: "",
      });
    }, milliSec);

    // Wait 3000ms
    milliSec += 3000;
    countDown = setTimeout(() => {
      setProbe({
        num: -1,
        display: "none",
      });
      listening = true;
    }, milliSec);

    return () => {
      clearTimeout(countDown);
      removeEvent();
    };

    // eslint-disable-next-line
  }, [props.currTrial]);

  const styleForCentral = {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "3em 4em 0em 4em",
  };

  return (
    <React.Fragment>
      <div style={styleForCentral}>
        <h1 style={{ position: "absolute" }}>{fixation}</h1>
        <h2 style={{ position: "absolute", display: switcher.memorySet }}>
          {memorySet.map((element) => {
            if (memorySet.indexOf(element) !== memorySet.length - 1) {
              return element + " ,";
            } else {
              return element;
            }
          })}
        </h2>
        <img
          src={picture}
          style={{ position: "absolute", display: switcher.picture }}
          alt="Error"
        />
        <h2 style={{ zIndex: "3", marginTop: "12em" }}>{text}</h2>
        <h2 style={{ zIndex: "3", display: probe.display }}>{probe.num}</h2>
      </div>
    </React.Fragment>
  );
};

export default Block;
