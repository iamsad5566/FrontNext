import React, { useEffect, useState } from "react";
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
      blogService.saveToken(sessionStorage.getItem(setting.admin));
      blogService.getArticleBrowse(postId).then((response) => {
        setArticleTodayBrowse(response.data[0]);
        setArticleAllBrowse(response.data[1]);
      });
    }
  }, [postId]);
  return (
    <React.Fragment>
      <div className="post-preview">
        <Link href={`${postId}`}>
          <h2 className="post-title">{title}</h2>
          <h3 className="post-subtitle">
            <ReactMarkdown>{content}</ReactMarkdown>
          </h3>
        </Link>

        <p className="post-meta">
          Posted by
          <a href="#!">{"  Yen-Kuang  "}</a>
          on {date}
        </p>
        {AuthenticationService.isUserLoggedIn() ? (
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
        {AuthenticationService.isUserLoggedIn() ? (
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
