import React, { useEffect, useState } from "react";
import AuthenticationService from "../../../api/AuthenticationService";

const TextHandler = (props) => {
  let template = "";
  let index = 0;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let authenticationService = new AuthenticationService();

  if (props.text !== undefined) {
    template = props.text;
    index = props.index;
  }

  useEffect(() => {
    if (authenticationService.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDelete = () => {
    manipulateData.deleteTemplate(index);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <React.Fragment>
      <span
        style={{
          display: "inline-block",
          marginTop: "1em",
          width: "100%",
          textAlign: "justify",
        }}
        dangerouslySetInnerHTML={{ __html: template }}
      ></span>
      <div style={{ textAlign: "end", margin: "1em" }}>
        {isLoggedIn ? (
          <button
            className="btn btn-danger"
            type="button"
            style={{ borderRadius: "50%", fontSize: "0.6em" }}
            onClick={handleDelete}
          >
            {" "}
            Delete{" "}
          </button>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default TextHandler;
