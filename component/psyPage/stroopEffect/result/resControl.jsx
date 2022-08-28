import { useRouter } from "next/router";
import React, { useState } from "react";

const ResControl = () => {
  const [name, setName] = useState("");
  const [inputFailed, setInputFailed] = useState(false);
  let router = useRouter();

  const handleInput = (event) => {
    setName(event.target.value);
    setInputFailed(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length > 0) {
      document.getElementById("button").click();
    } else {
      setInputFailed(true);
    }
  };

  const styleForCenter = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1.5,
    textAlign: "center",
  };
  return (
    <React.Fragment>
      <div style={styleForCenter}>
        <div style={{ display: "block" }}>
          {inputFailed && (
            <div className="alert alert-danger"> 請輸入受試名稱! </div>
          )}
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <span> 請輸入你的受試名稱： </span>
            <input
              value={name}
              name="nameInput"
              onChange={handleInput}
              autoComplete="off"
            />
            <div></div>
            <button
              id="button"
              className="btn btn-primary"
              style={{ marginTop: "3em", borderRadius: "50%" }}
              onClick={() => {
                router.push({
                  pathname: "/psychology/stroop_effect/result",
                  query: { subject: name },
                });
              }}
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResControl;
