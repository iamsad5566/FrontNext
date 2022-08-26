import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Setting from "../../../setting";
import AuthenticationService from "../../api/AuthenticationService";
import BlogService from "../../api/BlogService";

const Article = (props) => {
  const { title, content, date, postId } = props;
  const [articleTodayBrowse, setArticleTodayBrowse] = useState(0);
  const [articleAllBrowse, setArticleAllBrowse] = useState(0);

  let setting = new Setting();
  let blogService = new BlogService();
  let authenticationService = new AuthenticationService();
  let loggedIn = false;

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure to delete it?")) {
      blogService.deleteArticle(postId).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  };

  useEffect(() => {
    if (authenticationService.isLoggedIn()) {
      loggedIn = true;
      blogService.saveToken(sessionStorage.getItem(setting.admin));
      blogService.getArticleBrowse(postId).then((response) => {
        setArticleTodayBrowse(response.data[0]);
        setArticleAllBrowse(response.data[1]);
      });
    }
  }, [postId]);
  return (
    <React.Fragment>
      <div className="post-preview" style={{ margin: "2em 0em" }}>
        <Link href={`${postId}`}>
          <span id="articleContainer">
            <h1 className="post-title">{title}</h1>
            <span
              className="post-subtitle"
              style={{ marginTop: "1.5em", lineHeight: 2 }}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </span>
          </span>
        </Link>

        <p className="post-meta">
          Posted by
          <a href="#!">{"  Yen-Kuang  "}</a>
          on {date}
        </p>
        {loggedIn ? (
          <button
            className="btn btn-danger btn-sm"
            style={styleForDeleteButton}
            onClick={() => handleDelete(postId)}
          >
            Delete
          </button>
        ) : (
          <></>
        )}
        {loggedIn ? (
          <div>
            {" "}
            <p>
              {" "}
              {`今日點擊次數：${articleTodayBrowse}， 總點擊次數：${articleAllBrowse}`}
            </p>{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="my-4" />
    </React.Fragment>
  );
};

export default Article;
