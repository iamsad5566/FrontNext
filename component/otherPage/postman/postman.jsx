import Link from "next/link";
import React, { useEffect, useState } from "react";
import Setting from "../../../../setting";
import AuthenticationService from "../../../api/AuthenticationService";
import OtherPageService from "../../../api/OtherPageService";
import FirstTimeVisit from "./firstTimeVisit";
import PostmanManager from "./postmanManager";
import TextHandler from "./textHandler";

const Postman = () => {
  const [template, setTemplate] = useState("");
  const [remoteTemplate, setRemoteTemplate] = useState([]);
  const [index, setIndex] = useState(0);
  const Explanation =
    'First: Select a template you want. You can build up a template by contacting me, I will help you (see the contact information below).\n Second: Please upload your csv file by pressing the "Choose File" button, make sure you have "date", "name", and "mail" in your first row. Also, take care of the format of "date", <red>it must be something like this "4/3 (日) 22:00"<red>. These three columns above are necessary, but order of them is not important. Then, fill in your Gmail account (Both with @gmail.com or without it are fine) and the subject of mail. \nThird: Press send. If there\'s nothing wrong, you would see a progress bar after pressing the button. If there\'s anything wrong and you have no idea to fix it, feel free to contact me anytime (please email to one of the below: chen3210g@gmail.com, nf8964p5566@gmail.com, yenkuang1993@ntu.edu.tw).';
  let key = 1;
  let setting = new Setting();
  let authenticationService = new AuthenticationService();
  let otherPageService = new OtherPageService();

  let handleChange = (event) => {
    let tmpTemplate = event.target.value;
    let tmpIndex = 0;
    for (let i = 0; i < event.target.length; i++) {
      if (tmpTemplate === event.target[i].value) {
        let tmp = event.target[i].id;
        tmpIndex = tmp;
        break;
      }
    }
    setIndex(tmpIndex);
    setTemplate(tmpTemplate);
  };

  let keyExplation = 0;
  const styleForInput = {
    borderColor: "#5b88a4",
    borderStyle: "groove",
    textAlign: "center",
  };

  useEffect(() => {
    const getData = () => {
      otherPageService.getAllTemplate().then((response) => {
        setRemoteTemplate(response.data);
      });
    };

    if (authenticationService.isLoggedIn()) {
      otherPageService.saveToken(sessionStorage.getItem(setting.admin));
      getData();
    } else {
      authenticationService.login("guest", "guest").then((response) => {
        authenticationService.registerLogin("guest", response.data.token);
        otherPageService.saveToken(sessionStorage.getItem("guest"));
        getData();
      });
    }
  }, []);

  return (
    <React.Fragment>
      <FirstTimeVisit />
      <div
        className="container"
        style={{
          marginTop: "1em",
          marginBottom: "3em",
          height: "auto",
          fontSize: "1.2em",
        }}
      >
        <div className="row justify-content-md-center">
          <div
            className="col col-lg-4"
            style={{
              borderStyle: "groove",
              borderColor: "#5b88a4",
              textAlign: "center",
            }}
          >
            <h3>Instruction:</h3>
            {Explanation.split("\n").map((p) => {
              if (p.includes("<red>")) {
                let pArr = p.split("<red>");
                return (
                  <React.Fragment key={keyExplation++}>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "1em",
                        textAlign: "justify",
                      }}
                    >
                      <span>{pArr[0]}</span>
                      <span style={{ color: "red" }}>{pArr[1]}</span>
                      <span>{pArr[2]}</span>
                    </span>
                  </React.Fragment>
                );
              }

              return (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "1em",
                    textAlign: "justify",
                  }}
                  key={keyExplation++}
                >
                  {" "}
                  {p}{" "}
                </span>
              );
            })}
          </div>
          <div className="col-md-auto" style={styleForInput}>
            <span
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "4em",
              }}
            >
              <label>
                Template select:　
                <select
                  name="template"
                  value={template}
                  onChange={handleChange}
                >
                  <option value="" label="Choose a template" />

                  {remoteTemplate.map((template) => {
                    if (template.content !== undefined)
                      return (
                        <option
                          value={template.content}
                          key={template.id}
                          id={template.id}
                          label={`Template ${key++}`}
                        />
                      );
                    return <></>;
                  })}
                </select>
              </label>
            </span>

            <div style={{ marginTop: "2em" }}>
              <span> Press </span>
              <Link
                href="/other_services/postman/add"
                style={{
                  fontWeight: "bold",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                here
              </Link>
              <span> to add a new template </span>
            </div>

            <PostmanManager text={template} index={index} />
          </div>
          <div
            className="col col-lg-4"
            style={{
              borderStyle: "groove",
              borderColor: "#5b88a4",
              textAlign: "center",
            }}
          >
            <h3>Preview</h3>
            <span style={{ display: "inline-block" }}>
              <TextHandler text={template} index={index} />
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Postman;
