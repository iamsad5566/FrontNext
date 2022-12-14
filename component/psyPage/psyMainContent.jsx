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
    overflow: "hidden",
  };
  const [prefix, setPrefix] = useState("");
  const [padding, setPadding] = useState(1);

  useEffect(() => {
    setPrefix(document.baseURI);
    let width = window.innerWidth;
    if (width > 1400) {
      setIndent(width * 0.65);
    } else if (width <= 1400 && width >= 768) {
      setIndent(width * 0.6);
      setPadding((padding) => padding / width);
    } else if (width < 768) {
      setIndent(width * 0.15);
      setPadding((padding) => padding / width);
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
            <li style={{ padding: `${padding}em 0em` }}>
              <Link legacyBehavior href={prefix + "/counseling_map"}>
                <a className="psy-title"> 全國心理師分佈資料 </a>
              </Link>
            </li>
            <li style={{ padding: `${padding}em 0em` }}>
              <Link legacyBehavior href={prefix + "/emo_color"}>
                <a className="psy-title"> Emotion and memory (Beta) </a>
              </Link>
            </li>
            <li style={{ padding: `${padding}em 0em` }}>
              <Link legacyBehavior href={prefix + "/stroop_effect"}>
                <a className="psy-title"> Stroop effect </a>
              </Link>
            </li>
            <li style={{ padding: `${padding}em 0em` }}>
              <Link legacyBehavior href={prefix + "/selective_attention"}>
                <a className="psy-title"> Selective attentition </a>
              </Link>
            </li>
            <li style={{ padding: `${padding}em 0em` }}>
              <Link legacyBehavior href={prefix + "/stroop_effect/result"}>
                <a className="psy-title"> Result </a>
              </Link>
            </li>
            <li style={{ padding: `${padding}em 0em`, display: "none" }}>
              <Link legacyBehavior href={prefix + "/questionnaire/big5"}>
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
