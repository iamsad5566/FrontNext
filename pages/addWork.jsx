import React, { useEffect, useState } from "react";
import AuthenticationService from "../api/AuthenticationService";
import AddWorkComponent from "../component/homePage/addWork";
import Login from "./login";

const AddWork = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let authenticationService = new AuthenticationService();

  useEffect(() => {
    if (authenticationService.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <React.Fragment>
      {isLoggedIn ? <AddWorkComponent /> : <Login />}
    </React.Fragment>
  );
};

export default AddWork;
