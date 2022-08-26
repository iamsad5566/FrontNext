import React, { useEffect, useState } from "react";
import Setting from "../../../setting";
import AuthenticationService from "../../api/AuthenticationService";
import BlogService from "../../api/BlogService";
import BlogHeader from "./blogHeader";
import Categories from "./categories";

const BlogInterface = () => {
  const [todayBrowseTimes, setTodayBrowseTimes] = useState(0);
  const [totalBrowseTimes, setTotalBrowseTimes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postCategory, setPostCategory] = useState("All");
  const [rowsForEachCategory, setRowsForEachCategory] = useState(0);
  let key = 0;
  const authenticationService = new AuthenticationService();
  const blogService = new BlogService();
  const setting = new Setting();
  let categories = new Categories();

  const handleCategory = (event) => {
    setIsLoading(false);
    setPostCategory(event.target.value);
  };

  function getRows() {
    blogService
      .getRowsByCategory(postCategory)
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
    if (authenticationService.isLoggedIn()) {
      let token = sessionStorage.getItem(setting.admin);
      blogService.saveToken(token);
      getRows();
    } else {
      authenticationService
        .login("guest", "guest")
        .then((response) => {
          authenticationService.registerLogin("guest", response.data.token);
          getRows();
        })
        .catch(() => {
          alert("Someting wrong, please try to reload the page!");
        });
    }
  }, [postCategory]);

  const styleForBrowseTimes = {
    textAlign: "center",
  };

  const styleForCategory = {
    margin: "5em",
    textAlign: "center",
  };

  return (
    <React.Fragment>
      <BlogHeader />
      <div style={styleForCategory}>
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
      </div>
    </React.Fragment>
  );
};

export default BlogInterface;
