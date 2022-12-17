import React, { useEffect, useState } from "react";
import BlogService from "../../api/BlogService";
import AuthenticationService from "../../api/AuthenticationService";
import Setting from "../../../setting";
import Loading from "../loading";
import Article from "./article";
import Pagination from "./pagination";
import Link from "next/link";

const MainContent = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [offset, setOffset] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  let blogService = new BlogService();
  let authenticationService = new AuthenticationService();
  let setting = new Setting();
  let id = 0;
  const numbersOfItems = props.rowsForEachCategory;

  const handlePageChange = (page) => {
    if (currentPage === page) {
      return;
    }
    setCurrentPage(page);
    let tmpOffset = (page - 1) * pageSize;
    setOffset(tmpOffset);

    let last = props.rowsForEachCategory - (page - 1) * pageSize;
    let rows = last < pageSize ? last : pageSize;
    setLoading(true);
  };

  const handlePagePlus = (page, total) => {
    if (page < Math.ceil(total / pageSize)) {
      setCurrentPage((currentPage) => currentPage + 1);

      let tmpOffset = offset + pageSize;
      setOffset(tmpOffset);

      let last = total - page * pageSize;
      let rows = last < pageSize ? last : pageSize;
      setLoading(true);
    }
  };

  const handlePageMinus = (page) => {
    if (page > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
      let tmpOffset = offset - pageSize;
      setOffset(tmpOffset);
      setLoading(true);
    }
  };
  useEffect(() => {
    const getArticles = () => {
      blogService
        .getPageContent(offset, rows, props.category)
        .then((response) => {
          setArticles(response.data);
          setLoading(false);
        });
    };

    let rows = pageSize;
    setLoading(true);
    if (authenticationService.isLoggedIn()) {
      let token = sessionStorage.getItem(setting.admin);
      blogService.saveToken(token);
      getArticles();
    } else {
      authenticationService.login("guest", "guest").then((response) => {
        authenticationService.registerLogin("guest", response.data.token);
        blogService.saveToken(sessionStorage.getItem("guest"));
        getArticles();
      });
    }
  }, [offset]);

  return (
    <React.Fragment>
      <div style={{ textAlign: "center", marginTop: "3em" }}>
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div
              className="col-md-10 col-lg-8 col-xl-8"
              style={{ textAlign: "left", zIndex: 2 }}
            >
              {authenticationService.isLoggedIn() ? (
                <Link href="/blog/add">
                  <button
                    className="btn btn-primary"
                    style={{ marginBottom: "3em" }}
                  >
                    New Post
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {loading ? (
                <Loading />
              ) : (
                articles.map((article) => (
                  <Article
                    key={id++}
                    postId={article.postId}
                    title={article.title}
                    content={article.content.substring(0, 200)}
                    date={article.date}
                  />
                ))
              )}
              <div style={{ margin: "5em 0em" }}></div>
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                numbersOfItems={numbersOfItems}
                handlePageChange={handlePageChange}
                handlePageMinus={handlePageMinus}
                handlePagePlus={handlePagePlus}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainContent;

export async function getPostData(id) {
  let authenticationService = new AuthenticationService();
  let token = "";
  await authenticationService.login("guest", "guest").then((response) => {
    token = authenticationService.createToken(response.data.token);
  });

  const res = await fetch(
    `https://tw-yk.website:81/article/getSingleArticle/${id}?visited=true`,
    {
      headers: { Authorization: token },
    }
  );

  const article = await res.json();
  return article;
}
