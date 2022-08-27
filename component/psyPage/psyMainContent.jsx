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
    backgroundImage: "url(sakura.png)",
  };
  useEffect(() => {
    let width = window.innerWidth;
    if (width > 1000) {
      setIndent(width * 0.4);
    } else if (width < 768) {
      setIndent(width * 0.15);
    }
  }, []);

  return (
    <React.Fragment>
      <div style={styleForPutInCenter}>
        <div style={{ display: "block", width: "100%", overflow: "hidden" }}>
          <ul
            style={{
              listStyleType: "square",
              fontSize: "2em",
              fontWeight: 600,
              paddingLeft: `${indent}px`,
            }}
          >
            <li style={{ padding: "1em 0em" }}>
              <Link href="counsellingPsychologist">
                <a className="psy-title"> 全國心理師分佈資料 </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href="emotionAndColor">
                <a className="psy-title"> Emotion and memory (Beta) </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href="stroopEffect">
                <a className="psy-title"> Stroop effect </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href="selective_attention">
                <a className="psy-title"> Selective attentition </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href="result/stroop">
                <a className="psy-title"> Res </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em", display: "none" }}>
              <Link href="questionnaire/big5">
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
