import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../../component/navbar";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import AuthenticationService from "../../api/AuthenticationService";
import BlogService from "../../api/BlogService";
import Setting from "../../../setting";
const Post = () => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postID, setpostID] = useState(0);
  let authenticationService = new AuthenticationService();
  let blogService = new BlogService();
  let setting = new Setting();
  let router = useRouter();
  const dealWithATag = () => {
    let aList = document.getElementsByTagName("a");
    for (let i = 0; i < aList.length; i++) {
      aList[i].setAttribute("target", "_blank");
      aList[i].setAttribute("rel", "noreferrer");
    }
  };

  useEffect(() => {
    dealWithATag();
    let urlArr = document.baseURI.split("/");
    let tmpID = urlArr[urlArr.length - 1] || urlArr[urlArr.length - 2];
    setpostID(tmpID);

    if (authenticationService.isLoggedIn()) {
      setIsLoggedIn(true);
      blogService.saveToken(sessionStorage.getItem(setting.admin));
      blogService.getSingleArticle(tmpID).then((response) => {
        let tmpData = response.data;
        setArticle(tmpData);
      });
    } else {
      authenticationService.login("guest", "guest").then((response) => {
        authenticationService.registerLogin("guest", response.data.token);
        blogService.saveToken(sessionStorage.getItem("guest"));
        blogService.getSingleArticle(tmpID).then((response) => {
          let tmpData = response.data;
          setArticle(tmpData);
        });
      });
    }
  }, []);

  const styleForBackgroundImage = {
    backgroundImage: `url("https://tw-yk.com/1.jpeg")`,
  };

  const styleForPostInfo = {
    marginTop: "2em",
  };

  const styleForUpdateButton = {
    color: "white",
    width: "60%",
    marginTop: "2em",
  };
  return (
    <HelmetProvider>
      <React.Fragment>
        <Helmet>
          <title>{article.title}</title>
          <meta
            property="og:url"
            content={`https://tw-yk.com/blog/${postID}`}
          />
          <meta property="og:locale" content="zh_TW" />
          <meta property="og:description" content={article.content} />
          <meta property="og:title" content={article.title} />
          <meta property="og:type" content="article" />
          <meta property="fb:admins" content="153906327962277" />
          <meta property="og:image" content="https://tw-yk.com/book.jpg" />
          <link rel="icon" href="/chick.ico" type="image/x-icon" />
          <script src="https://kit.fontawesome.com/a076d05399.js" async />
        </Helmet>
        <NavBar />
        <header className="masthead" style={styleForBackgroundImage}>
          <div className="container position-relative px-4 px-lg-5">
            <Link href="/blog">
              <svg
                id="back"
                xmlns="//www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
            </Link>
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="post-heading">
                  <h1>{article.title}</h1>
                  <span className="meta" style={styleForPostInfo}>
                    Posted by {"Yen-Kuang "}
                    on {article.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <article className="mb-4">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-10">
                <ReactMarkdown>{article.content}</ReactMarkdown>

                <div style={{ textAlign: "center" }}>
                  {isLoggedIn ? (
                    <button
                      className="btn btn-success btn"
                      onClick={() => {
                        router.push({
                          pathname: "/blog/update",
                          query: {
                            postID: postID,
                          },
                        });
                      }}
                      style={styleForUpdateButton}
                    >
                      Update
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </React.Fragment>
    </HelmetProvider>
  );
};

export default Post;
