import React, { useEffect, useState } from "react";
import BlogService from "../../api/BlogService";
import AuthenticationService from "../../api/AuthenticationService";
import Setting from "../../../setting";
import Loading from "../loading";
import Article from "./article";
import Pagination from "./pagination";

const MainContent = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [offset, setOffset] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  let blogService = new BlogService();
  let authenticationService = new AuthenticationService();
  let setting = new Setting();
  let id = 0;
  const numberOfItems = props.rowsForEachCategory;

  const handleChangePage = (page) => {
    setCurrentPage(page);
    let tmpOffset = (page - 1) * pageSize;
    setOffset(tmpOffset);

    let last = props.rowsForEachCategory - (page - 1) * pageSize;
    let rows = last < pageSize ? last : pageSize;
    setLoading(true);
    blogService
      .getPageContent(offset, rows, props.category)
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      });
  };

  const handlePagePlus = (page, total) => {
    if (page < Math.ceil(total / pageSize)) {
      setCurrentPage((currentPage) => currentPage + 1);

      let tmpOffset = offset + pageSize;
      setOffset(tmpOffset);

      let last = total - page * pageSize;
      let rows = last < pageSize ? last : pageSize;
      setLoading(true);
      blogService
        .getPageContent(offset, pageSize, props.category)
        .then((response) => {
          setArticles(response.data);
          setLoading(false);
        });
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
  }, [currentPage]);

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div
              className="col-md-10 col-lg-8 col-xl-7"
              style={{ textAlign: "left" }}
            >
              {authenticationService.isUserLoggedIn() ? (
                <Link
                  href="add"
                  className="btn btn-primary"
                  style={{ marginBottom: "3em" }}
                >
                  New Post
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
                    content={article.content}
                    date={article.date}
                  />
                ))
              )}

              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                numbersOfItems={numbersOfItems}
                handlePageChange={this.handlePageChange}
                handlePageMinus={this.handlePageMinus}
                handlePagePlus={this.handlePagePlus}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainContent;
