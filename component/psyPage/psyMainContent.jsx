import Link from "next/link";
import React, { useEffect, useState } from "react";

const PsyMainContent = () => {
  const [indent, setIndent] = useState(0);
  const styleForPutInCenter = {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url(psy.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    setPrefix(document.baseURI);
    let width = window.innerWidth;
    if (width > 1000) {
      setIndent(width * 0.65);
    } else if (width < 768) {
      setIndent(width * 0.15);
      document.getElementById("back-cover").style.backgroundPosition =
        "right bottom";
    }
  }, []);

  return (
    <React.Fragment>
      <div id="back-cover" style={styleForPutInCenter}>
        <div
          id="psy-list"
          style={{ display: "block", width: "100%", overflow: "hidden" }}
        >
          <ul
            style={{
              listStyleType: "square",

              fontSize: "2em",
              fontWeight: 600,
              paddingLeft: `${indent}px`,
            }}
          >
            <li style={{ padding: "1em 0em" }}>
              <Link href={prefix + "/counseling_map"}>
                <a className="psy-title"> 全國心理師分佈資料 </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href={prefix + "/emo_color"}>
                <a className="psy-title"> Emotion and memory (Beta) </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href={prefix + "/stroop_effect"}>
                <a className="psy-title"> Stroop effect </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href={prefix + "/selective_attention"}>
                <a className="psy-title"> Selective attentition </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href={prefix + "/stroop_effect/result"}>
                <a className="psy-title"> Result </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em", display: "none" }}>
              <Link href={prefix + "/questionnaire/big5"}>
                <a className="psy-title"> Big 5 </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PsyMainContent;
