import Link from "next/link";
import React from "react";

const StroopEnd = () => {
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
            <Link
              href={`/psychology/stroop_effect/result/${sessionStorage.getItem(
                "subject"
              )}`}
            >
              <button className="btn btn-info" style={{ margin: "2em" }}>
                結果頁面
              </button>
            </Link>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StroopEnd;
