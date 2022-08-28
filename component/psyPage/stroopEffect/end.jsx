import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const StroopEnd = () => {
  let router = useRouter();
  const [subject, setSubject] = useState("");
  useEffect(() => {
    setSubject(sessionStorage.getItem("subject"));
  }, []);

  const styleForCenter = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1.5,
  };
  return (
    <React.Fragment>
      <div style={styleForCenter}>
        <div style={{ display: "block", textAlign: "center" }}>
          <h1> The end, thanks for attending the experiment! </h1>
          <div></div>
          <span style={{ marginTop: "3em" }}>
            {" "}
            Click here to see your result.{" "}
            <button
              className="btn btn-info"
              style={{ margin: "2em" }}
              onClick={() => {
                router.push({
                  pathname: `/psychology/stroop_effect/result`,
                  query: { subject: sessionStorage.getItem("subject") },
                });
              }}
            >
              結果頁面
            </button>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StroopEnd;
