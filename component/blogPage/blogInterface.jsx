import React, { useEffect, useState } from "react";
import Setting from "../../../setting";
import AuthenticationService from "../../api/AuthenticationService";
import BlogService from "../../api/BlogService";
import Loading from "../loading";
import CookieParser from "../module/CookieParser";
import BlogHeader from "./blogHeader";
import CategoryIndex from "./categoryIndex";
import MainContent from "./mainContent";

const BlogInterface = () => {
  const [todayBrowseTimes, setTodayBrowseTimes] = useState(0);
  const [totalBrowseTimes, setTotalBrowseTimes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postCategory, setPostCategory] = useState("All");
  const [rowsForEachCategory, setRowsForEachCategory] = useState(0);
  const [width, setWidth] = useState(0);
  let key = 0;
  const authenticationService = new AuthenticationService();
  const blogService = new BlogService();
  const setting = new Setting();

  const handleCategory = (event) => {
    if (postCategory === event.target.value) {
      return;
    }
    setIsLoading(false);
    setPostCategory(event.target.value);
  };

  const handleCategoryByText = (txt) => {
    if (txt === postCategory) {
      return;
    }
    setIsLoading(false);
    setPostCategory(txt);
  };

  function getRows(visited) {
    blogService
      .getRowsByCategory(postCategory, visited)
      .then((response) => {
        setRowsForEachCategory(response.data);
      })
      .then(
        blogService.getBlogBrowse().then((response) => {
          setTodayBrowseTimes(response.data[0]);
          setTotalBrowseTimes(response.data[1]);
        })
      )
      .then(() => {
        setIsLoading(true);
      });
  }

  useEffect(() => {
    let visited = CookieParser.hasVisited(document.cookie, "blog");
    if (authenticationService.isLoggedIn()) {
      document.cookie = "blog=visited; max-age=86400; path=/";
      let token = sessionStorage.getItem(setting.admin);
      blogService.saveToken(token);
      getRows(visited);
    } else {
      authenticationService
        .login("guest", "guest")
        .then((response) => {
          document.cookie = "blog=visited; max-age=86400; path=/";
          authenticationService.registerLogin("guest", response.data.token);
          blogService.saveToken(sessionStorage.getItem("guest"));
          getRows(visited);
        })
        .catch(() => {
          alert("Someting wrong, please try to reload the page!");
        });
    }
    setWidth(window.innerWidth);
  }, [postCategory]);

  return (
    <React.Fragment>
      <BlogHeader />
      <CategoryIndex
        width={width}
        postCategory={postCategory}
        handleCategory={handleCategory}
        handleCategoryByText={handleCategoryByText}
      />
      <div id="blogArticleContainer">
        {isLoading ? (
          <MainContent
            rowsForEachCategory={rowsForEachCategory}
            category={postCategory}
          />
        ) : (
          <Loading />
        )}
        <div style={{ marginTop: "2em" }}></div>
        <span>
          <p>{`今日瀏覽次數：${todayBrowseTimes}， 總瀏覽次數：${totalBrowseTimes}`}</p>
        </span>
      </div>
    </React.Fragment>
  );
};

export default BlogInterface;
