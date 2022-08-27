import React, { useState } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import BlogService from "../../api/BlogService";
import Setting from "../../../setting";
import Link from "next/link";

const MDEditor = (props) => {
  const [sent, setSent] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [value, setValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  let blogService = new BlogService();
  let setting = new Setting();
  function loadSuggestions(text) {
    return new Promise((accept, reject) => {
      setTimeout(() => {
        const suggestions = [
          {
            preview: "Andre",
            value: "@andre",
          },
          {
            preview: "Angela",
            value: "@angela",
          },
          {
            preview: "David",
            value: "@david",
          },
          {
            preview: "Louise",
            value: "@louise",
          },
        ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
        accept(suggestions);
      }, 250);
    });
  }

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const handleSubmit = () => {
    blogService.saveToken(sessionStorage.getItem(setting.admin));
    blogService
      .saveArticle(props.title, value, props.category)
      .then((response) => {
        setSent(true);
        setSuccessful(true);
      })
      .catch(() => {
        setSent(true);
      });
  };

  const styleForMD = {
    boxSizing: "border-box",
    fontSize: "1em",
    fontFamily: "sans-serif",
    lineHeight: "1.15",
    width: "90%",
    height: "auto",
    padding: "10px",
    display: "inline-block",
    textAlign: "justify",
  };
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        {sent ? (
          successful ? (
            <div className="alert alert-success" style={{ margin: "2em" }}>
              {" "}
              sent!{" "}
            </div>
          ) : (
            <div className="alert alert-danger" style={{ margin: "2em" }}>
              {" "}
              failed!{" "}
            </div>
          )
        ) : (
          <></>
        )}
        <div className="mdContainer" style={styleForMD}>
          <ReactMde
            minEditorHeight={450}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            loadSuggestions={loadSuggestions}
            childProps={{
              writeButton: {
                tabIndex: -1,
              },
            }}
          />
          <div style={{ textAlign: "right" }}>
            <Link href="/blog">
              <button
                className="btn btn-danger"
                style={{
                  marginTop: "1em",
                  marginRight: "1em",
                  borderRadius: "50%",
                }}
              >
                back
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: "1em", borderRadius: "50%" }}
              onClick={handleSubmit}
            >
              {" "}
              Post{" "}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MDEditor;
