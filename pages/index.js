import React, { useEffect, useState } from "react";
import AuthenticationService from "../api/AuthenticationService";
import HomePageService from "../api/HomePageService";
import Setting from "../../setting";
import StyleComponent from "../styleComponents/styles";
import HeaderHomePage from "../header/headerHomePage";
import ShootingStar from "../component/homePage/shootingStar";
import Cover from "../component/homePage/cover";
import NavBar from "../component/navbar";
import IntroManager from "../component/homePage/introManager";
import Intro from "../component/homePage/intro";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Home = () => {
  const [loginButton, setLoginButton] = useState("Login if you are yk");
  const [updating, setUpdating] = useState(false);
  const [works, setWorks] = useState([]);
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasLoggedIn, setLoggedIn] = useState(false);
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
      setLoggedIn(true);
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
    <HelmetProvider>
      <Helmet>
        <title>Yen-Kuang Chen</title>
        <meta property="og:url" content="https://tw-yk.com" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:description"
          content="Welcome to my website! I'm dedicated to updating this web, so just feel free to come anytime, maybe you will find something new and interesting!"
        />
        <meta property="og:title" content="彥匡ㄉ家" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/2.jpeg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald&display=swap"
          rel="stylesheet"
        />
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
      </Helmet>
      <HeaderHomePage />
      <NavBar />

      <div className="container-fluid" style={style.styleForContainer}>
        <ShootingStar />
        <div className="row" id="cover">
          <Cover />
        </div>

        <div style={{ textAlign: "center", width: "100%" }}>
          <span
            id="picContainer"
            style={{ display: "inline-block", marginTop: "2em" }}
          >
            <div className="col-sm-5 p-5" style={style.sytleForPhotoContainer}>
              <a href="/" className="photo">
                <h2 id="myName">YK Chen</h2>
                <img id="yk" src="./myPic.jpeg" alt="AAA" />
                <div className="glow-wrap">
                  <i className="glow"></i>
                </div>
              </a>
            </div>
          </span>
        </div>

        <div className="row" style={style.styleForIntro}>
          <div
            className="introContainer"
            id="introContainer"
            style={style.styleForIntroContainer}
          >
            {updating ? (
              <IntroManager
                handleSubmitIntro={handleSubmitIntro}
                content={intro}
              />
            ) : (
              <Intro content={intro} loading={loading} />
            )}
            <div style={{ height: "2em" }}></div>
            {hasLoggedIn && !updating ? (
              <button className="btn btn-primary" onClick={handleUpdateIntro}>
                Update
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Home;
