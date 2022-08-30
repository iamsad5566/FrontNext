import Link from "next/link";
import React, { useEffect, useState } from "react";
import Setting from "../../../../setting";
import AuthenticationService from "../../../api/AuthenticationService";
import OtherPageService from "../../../api/OtherPageService";

const NewTemplate = () => {
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#000001");
  const btn = "btn btn-outline-dark btn-sm";
  const [btnController, setBtnController] = useState([
    { name: "bold", class: btn, style: "" },
    { name: "italic", class: btn, style: "" },
    { name: "underline", class: btn, style: "" },
    { name: "line-through", class: btn, style: "" },
  ]);

  const [alignController, setAlignController] = useState([
    { name: "left", class: btn, style: "" },
    { name: "center", class: btn, style: "" },
    { name: "right", class: btn, style: "" },
    { name: "justify", class: btn, style: "" },
  ]);

  const [key, setKey] = useState("");
  const [successful, setSuccessful] = useState("");
  let authenticationService = new AuthenticationService();
  let otherPageService = new OtherPageService();
  let setting = new Setting();

  const handleInput = (event) => {
    setContent(event.target.innerHTML);
  };

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const handleChangeColor = () => {
    if (color !== "#000001") {
      if (window.getSelection().toString().length > 0) {
        let span = document.createElement("span");
        span.className = "newLine";
        span.style.display = "inline";
        span.style.width = "100%";
        span.style.color = color;

        let sel = window.getSelection();

        if (sel.rangeCount) {
          let range = sel.getRangeAt(0).cloneRange();

          span.append(range.extractContents());
          sel.removeAllRanges();
          range.insertNode(span);
          sel.addRange(range);
        }
      }
    }
  };

  const handleClick = (event) => {
    let index = 0;
    for (let i = 0; i < btnController.length; i++) {
      if (btnController[i].name === event.target.value) {
        index = i;
        break;
      }
    }

    let tmpList = [...btnController];

    if (tmpList[index].class === btn) {
      tmpList[index].class = btn + " active";
      tmpList[index].style = event.target.value;
    } else {
      tmpList[index].class = btn;
      tmpList[index].style = "normal";
      if (index === 2 || index === 3) {
        tmpList[index].style = "none";
      }
    }
    setBtnController(tmpList);

    if (window.getSelection().toString().length > 0) {
      let span = document.createElement("span");
      span.className = "newLine";
      span.style.display = "inline";
      span.style.width = "100%";
      span.style.color = color;
      span.style.fontWeight = btnController[0].style;
      span.style.fontStyle = btnController[1].style;
      span.style.textDecoration =
        btnController[2].style + " " + btnController[3].style;
      let sel = window.getSelection();

      if (sel.rangeCount) {
        let range = sel.getRangeAt(0).cloneRange();

        span.append(range.extractContents());
        sel.removeAllRanges();
        range.insertNode(span);
        sel.addRange(range);
      }
    }
  };

  const handleAlignClick = (event) => {
    let alignList = [...alignController];

    for (let i = 0; i < alignList.length; i++) {
      if (alignList[i].name === event.target.value) {
        alignList[i].class = btn + " active";
        alignList[i].style = event.target.value;
      } else {
        alignList[i].style = "";
        alignList[i].class = btn;
      }
    }

    setAlignController(alignList);

    if (window.getSelection().toString().length > 0) {
      let span = document.createElement("span");
      span.className = "newLineBlock";
      span.style.display = "inline-block";
      span.style.width = "100%";
      span.style.color = color;
      span.style.textAlign =
        alignController[0].style +
        alignController[1].style +
        alignController[2].style +
        alignController[3].style;

      let sel = window.getSelection();

      if (sel.rangeCount) {
        let range = sel.getRangeAt(0).cloneRange();

        span.append(range.extractContents());
        sel.removeAllRanges();
        range.insertNode(span);
        sel.addRange(range);
      }
    }
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    otherPageService.saveToken(sessionStorage.getItem("guest"));
    otherPageService
      .sendTemplate(key, content)
      .then(() => {
        setSuccessful("Successfully saved!");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (authenticationService.isLoggedIn()) {
      otherPageService.saveToken(sessionStorage.getItem(setting.admin));
    } else {
      authenticationService.login("guest", "guest").then((response) => {
        authenticationService.registerLogin("guest", response.data.token);
        otherPageService.saveToken(sessionStorage.getItem("guest"));
      });
    }
  }, []);

  const popOut = () => {
    alert(
      "--------------------NOTE--------------------!!!\n\nPlease replace the keywords as follows:\n\n Subject name ->  *****Name*****\n Date ->  *****Date*****\n Week day ->  *****Week*****\n Time ->  *****Time*****"
    );
  };

  const styleForMiddle = {
    height: "100vh",
  };
  return (
    <React.Fragment>
      <div
        className="container"
        style={{ marginTop: "6em", marginBottom: "2em" }}
      >
        <div className="row justify-content-md-center" style={styleForMiddle}>
          <div
            className="col col-lg-5.5 m-1"
            style={{ border: "solid", textAlign: "center" }}
          >
            <h3 style={{ marginTop: "1em" }}>
              {" "}
              Editor{" "}
              <button
                className="btn btn-info btn-sm"
                style={{
                  borderRadius: "50%",
                  fontSize: "0.6em",
                  marginLeft: "8em",
                  marginTop: "1em",
                  position: "absolute",
                }}
                onClick={popOut}
              >
                {" "}
                NOTE{" "}
              </button>
            </h3>
            <div style={{ textAlign: "left" }}>
              <input
                type="color"
                id="colorpicker"
                value={color}
                style={{
                  marginLeft: "1.2em",
                  height: "1.2em",
                  width: "1.2em",
                  marginRight: "1em",
                }}
                onChange={(event) => handleChange(event)}
              ></input>
              <span style={{ marginLeft: "0.3em" }}>
                <button
                  className={btnController[0].class}
                  style={{ fontWeight: "bold" }}
                  value="bold"
                  active="false"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  {" "}
                  A{" "}
                </button>
                <button
                  className={btnController[1].class}
                  style={{ fontStyle: "italic", marginLeft: "0.2em" }}
                  value="italic"
                  active="false"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  {" "}
                  A{" "}
                </button>
                <button
                  className={btnController[2].class}
                  style={{ textDecoration: "underline", marginLeft: "0.2em" }}
                  value="underline"
                  active="false"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  {" "}
                  A{" "}
                </button>
                <button
                  className={btnController[3].class}
                  style={{
                    textDecoration: "line-through",
                    marginLeft: "0.2em",
                  }}
                  value="line-through"
                  active="false"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  {" "}
                  A{" "}
                </button>

                <button
                  className={alignController[0].class}
                  style={{ marginLeft: "0.2em" }}
                  value="left"
                  active="false"
                  onClick={(event) => {
                    handleAlignClick(event);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-text-left"
                    viewBox="0 0 16 16"
                    style={{ pointerEvents: "none" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>

                <button
                  className={alignController[1].class}
                  style={{ marginLeft: "0.2em" }}
                  value="center"
                  active="false"
                  onClick={(event) => {
                    handleAlignClick(event);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-text-center"
                    viewBox="0 0 16 16"
                    style={{ pointerEvents: "none" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>

                <button
                  className={alignController[2].class}
                  style={{ marginLeft: "0.2em" }}
                  value="right"
                  active="false"
                  onClick={(event) => {
                    handleAlignClick(event);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-text-right"
                    viewBox="0 0 16 16"
                    style={{ pointerEvents: "none" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>

                <button
                  className={alignController[3].class}
                  style={{ marginLeft: "0.2em" }}
                  value="justify"
                  active="false"
                  onClick={(event) => {
                    handleAlignClick(event);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-justify"
                    viewBox="0 0 16 16"
                    style={{ pointerEvents: "none" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>
              </span>
            </div>

            <span
              style={{
                display: "inline-block",
                width: "95%",
                marginTop: "0.5em",
              }}
            >
              <span
                contentEditable="true"
                placeholder="Text here"
                id="templateEditor"
                onInput={(event) => handleInput(event)}
                onSelect={handleChangeColor}
                style={{ fontSize: "1.5em" }}
              />
            </span>
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                value={key}
                onChange={(event) => handleKeyChange(event)}
                type="password"
              />{" "}
              <button
                className="btn btn-primary"
                style={{
                  borderRadius: "50%",
                  marginLeft: "1em",
                  fontSize: "1em",
                }}
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                {" "}
                Submit{" "}
              </button>
            </form>
          </div>
          <div
            className="col col-lg-5.5 m-1"
            style={{ border: "solid", textAlign: "center" }}
          >
            <h3 style={{ marginTop: "1em" }}> Preview </h3>
            <div>
              <span
                style={{
                  marginTop: "1.5em",
                  textAlign: "left",
                  display: "inline-block",
                  border: "solid",
                  width: "95%",
                  height: "85vh",
                  fontSize: "1.5em",
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <span
                style={{
                  display: "inline-block",
                  marginTop: "1.2em",
                  fontSize: "0.8em",
                }}
              >
                {successful.length > 0 ? (
                  <React.Fragment>
                    {" "}
                    <span className="alert alert-success">
                      {" "}
                      {successful}{" "}
                    </span>{" "}
                    <span style={{ marginLeft: "2em" }}>
                      {" "}
                      Press{" "}
                      <Link href="/other_services/postman">
                        <a
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            textDecoration: "none",
                            fontSize: "1em",
                          }}
                        >
                          here
                        </a>
                      </Link>{" "}
                      to return{" "}
                    </span>{" "}
                  </React.Fragment>
                ) : (
                  <></>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewTemplate;
