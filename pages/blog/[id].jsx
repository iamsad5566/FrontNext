import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../component/navbar";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AuthenticationService from "../../api/AuthenticationService";
import Head from "next/head";
import { getPostData } from "../../component/blogPage/mainContent";
import BlogService from "../../api/BlogService";
import Setting from "../../../setting";

const Post = (props) => {
  let router = useRouter();
  let id;
  let title;
  let content;
  let date;
  if (!router.isFallback) {
    id = props.params.id;
    title = props.article.title;
    content = props.article.content;
    date = props.article.date;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  let authenticationService = new AuthenticationService();
  let blogService = new BlogService();
  let setting = new Setting();

  const dealWithATag = () => {
    let aList = document.getElementsByTagName("a");
    for (let i = 0; i < aList.length; i++) {
      aList[i].setAttribute("target", "_blank");
      aList[i].setAttribute("rel", "noreferrer");
    }
  };

  useEffect(() => {
    dealWithATag();
    if (authenticationService.isLoggedIn()) {
      setIsLoggedIn(true);
      blogService.saveToken(sessionStorage.getItem(setting.admin));
      blogService.getSingleArticle(id).then((response) => {
        setUpdateContent(response.data.content);
      });
    } else {
      authenticationService.login("guest", "guest").then((response) => {
        blogService.saveToken(
          authenticationService.createToken(response.data.token)
        );
        blogService.getSingleArticle(id).then((res) => {
          setUpdateContent(res.data.content);
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

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content={`https://tw-yk.com/blog/${id}`} />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:description" content={content} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/book.png" />
        <link rel="icon" href="/chick.ico" type="image/x-icon" />
      </Head>
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
                <h1>{title}</h1>
                <span className="meta" style={styleForPostInfo}>
                  Posted by {"Yen-Kuang "}
                  on {date}
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
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {updateContent}
              </ReactMarkdown>

              <div style={{ textAlign: "center" }}>
                {isLoggedIn ? (
                  <button
                    className="btn btn-success btn"
                    onClick={() => {
                      router.push({
                        pathname: "/blog/update",
                        query: {
                          postID: id,
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
  );
};

export default Post;

export const getStaticPaths = () => {
  let idArr = [
    "12",
    "13",
    "15",
    "16",
    "17",
    "18",
    "20",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "29",
  ];
  return {
    paths: idArr.map((m) => {
      return { params: { id: m } };
    }),
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const article = await getPostData(params.id);
  return {
    props: {
      params,
      article,
    },
  };
}
