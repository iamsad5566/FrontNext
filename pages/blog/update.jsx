import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Setting from "../../../setting";
import AuthenticationService from "../../api/AuthenticationService";
import BlogService from "../../api/BlogService";
import UpdatePost from "../../component/blogPage/updatePost";
import Login from "../login";

const Update = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let authenticationService = new AuthenticationService();

  useEffect(() => {
    if (authenticationService.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <React.Fragment>{isLoggedIn ? <UpdatePost /> : <Login />}</React.Fragment>
  );
};

export default withRouter(Update);
