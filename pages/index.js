import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthenticationService from "../api/AuthenticationService";
import HomePageService from "../api/HomePageService";
import Setting from "../../setting";
import StyleComponent from "../styleComponents/styles";

const Home = () => {
  const [loginButton, setLoginButton] = useState("Login if you are yk");
  const [updating, setUpdating] = useState(false);
  const [works, setWorks] = useState([]);
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);
  let authenticationService = new AuthenticationService();
  let homePageService = new HomePageService();
  let setting = new Setting();

  const logout = () => {
    if (window.confirm("Are you sure to logout?")) {
      authenticationService.logout();
      alert("logged out!");
      document.cookie = `${setting.admin}=${setting.password};expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
      setLoginButton("Login if you are yk");
    }
  };

  const handleDeletWork = (title) => {
    if (window.confirm("Are you sure to delete this?")) {
      homePageService
        .deleteWork(title)
        .then(setTimeout(() => window.location.reload(), 100));
    }
  };

  const handleUpdateIntro = () => {
    setUpdating(true);
  };

  const handleSubmitIntro = (value) => {
    homePageService.updateIntro(value.content);
    setUpdating(false);
    setTimeout(() => window.location.reload(), 100);
  };

  useEffect(() => {
    if (!authenticationService.isLoggedIn()) {
      authenticationService.login("guest", "guest");
      homePageService.saveToken(sessionStorage.getItem("guest"));
    } else {
      homePageService.saveToken(sessionStorage.setItem(setting.admin));
    }

    homePageService.getWorks().then((response) => {
      setWorks(response.data.reverse());
    });

    homePageService.getIntro().then((response) => {
      setIntro(response.data);
    });
    setLoading(false);
  }, []);

  let style = new StyleComponent();
  return (
    <React.Fragment>
      <h1>Hello</h1>
    </React.Fragment>
  );
};

export default Home;
