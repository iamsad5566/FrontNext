import Link from "next/link";
import React, { useEffect, useState } from "react";

const OtherMainContent = () => {
  const [indent, setIndent] = useState(0);
  const [prefix, setPrefix] = useState("");

  const styleForPutInCenter = {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url(idea.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    setPrefix(document.baseURI);
    let width = window.innerWidth;
    if (width > 1000) {
      setIndent(width * 0.2);
    } else if (width < 768) {
      setIndent(width * 0.1);
    }
  }, []);
  return (
    <React.Fragment>
      <div style={styleForPutInCenter}>
        <div
          id="other-list"
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
              <Link href={prefix + "/chat-room"}>
                <a className="other-title"> Chat room </a>
              </Link>
            </li>
            <li style={{ padding: "1em 0em" }}>
              <Link href={prefix + "/postman"}>
                <a className="other-title"> Gmail postman </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OtherMainContent;
