import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactMde from "react-mde";
import Setting from "../../../setting";
import BlogService from "../../api/BlogService";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Categories from "./categories";

const UpdatePost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [sent, setSent] = useState(false);
  const [successful, setSuccessful] = useState(false);
  let setting = new Setting();
  let blogService = new BlogService();
  let categories = new Categories();
  let postID = document.baseURI.split("=")[1];
  let key = 0;
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    blogService.saveToken(sessionStorage.getItem(setting.admin));
    blogService
      .updatePost(title, content, postID, category)
      .then(() => {
        setSent(true);
        setSuccessful(true);
      })
      .catch(() => {
        setSent(true);
      });
  };

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

  const [selectedTab, setSelectedTab] = useState("write");

  const styleForMD = {
    boxSizing: "border-box",
    fontSize: "1em",
    fontFamily: "sans-serif",
    lineHeight: "1.15",
    width: "90%",
    height: "60vh",
    padding: "10px",
    display: "inline-block",
    textAlign: "justify",
  };

  useEffect(() => {
    blogService.saveToken(sessionStorage.getItem(setting.admin));
    blogService.getSingleArticle(postID).then((response) => {
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, []);

  return (
    <React.Fragment>
      <div style={{ marginTop: "3em" }}></div>
      <h1
        style={{
          textAlign: "center",
          margin: "1em",
          fontFamily: "fantasy",
          fontSize: "2.5em",
        }}
      >
        {" "}
        <i>Update</i>{" "}
      </h1>

      <div style={{ textAlign: "center" }}>
        <label style={{ width: "100%", display: "inline-block" }}>
          {" "}
          <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>Title: </span>
          <div></div>
          <input
            value={title}
            onChange={(event) => handleChange(event)}
            style={{
              width: "88%",
              height: "2em",
              padding: "1em",
              margin: "1em 0em",
            }}
          />
        </label>
      </div>

      <div style={{ textAlign: "center" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
          Category:{" "}
        </span>
        <div></div>
        <select onChange={(event) => handleCategory(event)} value={category}>
          {categories.all.map((category) => {
            return (
              <option key={key++} name={category}>
                {" "}
                {category}{" "}
              </option>
            );
          })}
        </select>
      </div>

      <div style={{ margin: "1em 0em 5em 0em" }}>
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
              value={content}
              onChange={setContent}
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
              <Link href={`/blog/${postID}`}>
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
      </div>
    </React.Fragment>
  );
};

export default UpdatePost;
