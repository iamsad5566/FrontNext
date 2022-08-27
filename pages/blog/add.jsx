import React, { useEffect, useState } from "react";
import AuthenticationService from "../../api/AuthenticationService";
import AddPost from "../../component/blogPage/addPost";
import Login from "../login";

const Add = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let authenticationService = new AuthenticationService();

  useEffect(() => {
    if (authenticationService.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <React.Fragment>{isLoggedIn ? <AddPost /> : <Login />}</React.Fragment>
  );
};

export default Add;
