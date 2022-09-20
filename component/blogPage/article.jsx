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
  const [loggedIn, setLoggedIn] = useState(false);

  let setting = new Setting();
  let blogService = new BlogService();
  let authenticationService = new AuthenticationService();

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure to delete it?")) {
      blogService.saveToken(sessionStorage.getItem(setting.admin));
      blogService.deleteArticle(postId).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  };

  useEffect(() => {
    let account = authenticationService.isLoggedIn() ? setting.admin : "guest";
    setLoggedIn(authenticationService.isLoggedIn());

    blogService.saveToken(sessionStorage.getItem(account));
    blogService.getArticleBrowse(postId).then((response) => {
      setArticleTodayBrowse(response.data[0]);
      setArticleAllBrowse(response.data[1]);
    });
  }, [postId]);

  return (
    <React.Fragment>
      <div className="post-preview" style={{ margin: "2em 0em" }}>
        <Link href={`/blog/${postId}`}>
          <span id="articleContainer">
            <h1 className="post-title">{title}</h1>
            <span
              className="post-subtitle"
              style={{
                marginTop: "1.5em",
                lineHeight: 2,
                textAlign: "justify",
              }}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </span>
          </span>
        </Link>

        <p className="post-meta" style={{ marginTop: "2em" }}>
          Posted by
          <a href="#!" id="author">
            {"  Yen-Kuang  "}
          </a>
          on {date}
        </p>
        {loggedIn ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(postId)}
          >
            Delete
          </button>
        ) : (
          <></>
        )}
        <div style={{ marginTop: "1.5em" }}>
          {" "}
          <p>
            {" "}
            {`今日瀏覽次數：${articleTodayBrowse}， 總瀏覽次數：${articleAllBrowse}`}
          </p>{" "}
        </div>
      </div>
      <hr className="my-4" />
    </React.Fragment>
  );
};

export default Article;
