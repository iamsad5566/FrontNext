import React, { useEffect, useState } from "react";
import Setting from "../../../setting";
import AuthenticationService from "../../api/AuthenticationService";
import BlogService from "../../api/BlogService";
import Loading from "../loading";
import CookieParser from "../module/CookieParser";
import BlogHeader from "./blogHeader";
import Categories from "./categories";
import MainContent from "./mainContent";

const BlogInterface = () => {
  const [todayBrowseTimes, setTodayBrowseTimes] = useState(0);
  const [totalBrowseTimes, setTotalBrowseTimes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postCategory, setPostCategory] = useState("All");
  const [rowsForEachCategory, setRowsForEachCategory] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  let key = 0;
  const authenticationService = new AuthenticationService();
  const blogService = new BlogService();
  const setting = new Setting();
  let categories = new Categories();

  const handleCategory = (event) => {
    setIsLoading(false);
    setPostCategory(event.target.value);
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
      document.cookie = "blog=visited; max-age=86400; path=/blog";
      setLoggedIn(true);
      let token = sessionStorage.getItem(setting.admin);
      blogService.saveToken(token);
      getRows(visited);
    } else {
      authenticationService
        .login("guest", "guest")
        .then((response) => {
          document.cookie = "blog=visited; max-age=86400; path=/blog";
          authenticationService.registerLogin("guest", response.data.token);
          blogService.saveToken(sessionStorage.getItem("guest"));
          getRows(visited);
        })
        .catch(() => {
          // alert("Someting wrong, please try to reload the page!");
        });
    }
  }, [postCategory]);

  return (
    <React.Fragment>
      <BlogHeader />
      <div id="blogArticleContainer">
        <h2 style={{ display: "inline", fontSize: "1.5em" }}>Category:</h2>
        <select
          style={{ marginLeft: "1em" }}
          value={postCategory}
          onChange={(event) => handleCategory(event)}
        >
          {categories.all.map((category) => {
            return (
              <option value={category} key={key++}>
                {" "}
                {category}{" "}
              </option>
            );
          })}
        </select>
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
