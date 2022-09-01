import Link from "next/link";
import React, { useEffect, useState } from "react";
import PsyGolangService from "../../../../api/PsyGolangService";
import BarChart from "./barChart";
import PieChart from "./pieChart";

const StroopRes = () => {
  /*
        0: trial number
        1: response key
        2: correct or not
        3: react time
        4: consistent or not
    */

  const [correctColor, setCorrectColor] = useState({});
  const [correctSemantic, setCorrectSemantic] = useState({});
  const [colorTime, setColorTime] = useState([]);
  const [semanticTime, setSemanticTime] = useState([]);

  const [passPie, setPassPie] = useState({});
  const [passBar, setPassBar] = useState([]);
  let psyGolangService = new PsyGolangService();

  // Get the subject name from session storage

  let height = "auto";
  let marginTop = "0em";

  if (document !== null && document.scrollingElement.clientWidth <= 700) {
    height = "140vh";
    marginTop = "10em";
  }

  const pieChange = (con) => {
    if (con === "semantic") {
      let tmpPie = { ...correctSemantic };
      let tmpBar = [...semanticTime];
      setPassPie(tmpPie);
      setPassBar(tmpBar);
    } else {
      let tmpPie = { ...correctColor };
      let tmpBar = [...colorTime];
      setPassPie(tmpPie);
      setPassBar(tmpBar);
    }
  };

  const styleForMiddle = {
    margin: "auto",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  useEffect(() => {
    const len = 16;
    let colorArr = [];
    let semanticArr = [];
    let url = window.location.href;
    let urlArr = url.split("=");
    let subject = decodeURI(
      urlArr[urlArr.length - 1] || urlArr[urlArr.length - 2]
    );
    psyGolangService
      .getStroopEffect(subject)
      .then((response) => {
        colorArr = response.data.color_res;
        semanticArr = response.data.semantic_res;
      })
      .then(() => {
        // Get correction
        const getCorrection = (array) => {
          let correction = 0;
          for (let i = 0; i < len; i++) {
            let subArr = array[i].split("|");
            if (subArr[2] === "correct") {
              correction++;
            }
          }

          return correction / len;
        };
        let colorCorr = getCorrection(colorArr);
        let semanticCorr = getCorrection(semanticArr);
        let colorObj = { Correct: colorCorr, Wrong: 1 - colorCorr };
        let semanticObj = { Correct: semanticCorr, Wrong: 1 - semanticCorr };
        setCorrectColor(colorObj);
        setCorrectSemantic(semanticObj);
        setPassPie(colorObj);
      })
      .then(() => {
        const getTime = (array) => {
          let conAccumulate = 0;
          let inconAccumulate = 0;

          for (let i = 0; i < len; i++) {
            let subArr = array[i].split("|");
            if (subArr[4] === "consistent") {
              conAccumulate += parseFloat(subArr[3]);
            } else {
              inconAccumulate += parseFloat(subArr[3]);
            }
          }

          conAccumulate /= len;
          inconAccumulate /= len;

          let outputArr = [
            { type: "Consistent", value: conAccumulate },
            { type: "Inconsistent", value: inconAccumulate },
          ];
          return outputArr;
        };

        let colorTimeArr = getTime(colorArr);
        let semanticTimeArr = getTime(semanticArr);
        setColorTime(colorTimeArr);
        setSemanticTime(semanticTimeArr);
        setPassBar(colorTimeArr);
      })
      .catch(() => {
        console.log("Something wrong!");
      });
  }, []);

  return (
    <React.Fragment>
      <div style={{ marginTop: marginTop }}></div>
      <div style={styleForMiddle}>
        <div className="container text-center">
          <div
            className="row justify-content-md-center"
            style={{ height: height }}
          >
            <div style={{ margin: "3em 0em" }}>
              <button
                className="btn btn-success"
                onClick={() => {
                  pieChange("color");
                }}
                style={{ borderRadius: "40% 5%" }}
              >
                Color
              </button>
              <button
                className="btn btn-info"
                onClick={() => {
                  pieChange("semantic");
                }}
                style={{ borderRadius: "40% 5%", marginLeft: "2em" }}
              >
                Semantic
              </button>
            </div>
            <div
              className="col col-lg-5.5"
              id="svgContainer"
              style={{ marginTop: "2em" }}
            >
              <PieChart data={passPie} />
            </div>
            <div className="col-md-auto"></div>
            <div className="col col-lg-5.5" style={{ marginTop: marginTop }}>
              <BarChart data={passBar} />
            </div>
            <div></div>
            <div style={{ margin: "3em 0em" }}>
              <Link href="/">
                <button
                  className="btn btn-danger"
                  style={{ marginTop: "5em", borderRadius: "30%" }}
                >
                  Leave
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StroopRes;
