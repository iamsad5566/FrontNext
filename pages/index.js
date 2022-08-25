import React, { useEffect, useState } from "react";
import AuthenticationService from "../api/AuthenticationService";
import HomePageService from "../api/HomePageService";
import Setting from "../../setting";
import StyleComponent from "../styleComponents/styles";
import ShootingStar from "../component/homePage/shootingStar";
import Cover from "../component/homePage/cover";
import NavBar from "../component/navbar";
import IntroManager from "../component/homePage/introManager";
import Intro from "../component/homePage/intro";
import { HelmetProvider, Helmet } from "react-helmet-async";
import TableInterface from "../component/homePage/tableComponent/tableInterface";
import Works from "../component/homePage/works";
import Link from "next/dist/client/link";

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
  let workKey = 1;

  const logout = () => {
    if (window.confirm("Are you sure to logout?")) {
      authenticationService.logout();
      alert("logged out!");
      document.cookie = `${setting.admin}=${setting.password};expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
      setLoginButton("Login if you are yk");
    }
  };

  const handleDeleteWork = (title) => {
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
      let homePageService = new HomePageService();
      homePageService.saveToken(sessionStorage.getItem(setting.admin));
      console.log("ok");
      setLoggedIn(true);
    }

    console.log(homePageService.config);
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/gorilla.jpg" type="image/x-icon" />
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
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
      </Helmet>
      <NavBar />

      <div className="container-fluid" style={style.styleForContainer}>
        <ShootingStar />
        <div className="row" id="cover">
          <Cover />
        </div>

        <div style={{ textAlign: "center", width: "100%" }}>
          <picture>
            <span
              id="picContainer"
              style={{ display: "inline-block", marginTop: "2em" }}
            >
              <div
                className="col-sm-5 p-5"
                style={style.sytleForPhotoContainer}
              >
                <a href="#" className="photo">
                  <h2 id="myName">YK Chen</h2>

                  <img id="yk" src="./myPic.jpeg" alt="AAA" />

                  <div className="glow-wrap">
                    <i className="glow"></i>
                  </div>
                </a>
              </div>
            </span>
          </picture>
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

        <div className="row" style={style.styleForContainer}>
          <div className="col-sm-8 p-4" style={style.styleForPutInCenter}>
            <TableInterface />
          </div>
        </div>

        <div
          className="row"
          id="worksContainer"
          style={style.styleForWorkFullCover}
        >
          <div style={style.styleForWorks}>
            <h1>My works</h1>
            {!hasLoggedIn ? (
              <></>
            ) : (
              <Link href="/addWork" className="btn btn-primary">
                Add work
              </Link>
            )}
            {works.map((work) => {
              return (
                <Works
                  key={workKey++}
                  id={workKey}
                  title={work.title}
                  url={work.url}
                  iconUrl={work.iconUrl}
                  handleDeleteWork={handleDeleteWork}
                />
              );
            })}
          </div>
        </div>

        <div className="row" style={style.styleForLoginButtonPostion}>
          <div>
            {" "}
            {!hasLoggedIn ? (
              <Link href="/login" style={{ borderRadius: "5% 30% 5% 30%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ fontWeight: "bold" }}
                >
                  {loginButton}
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-warning"
                onClick={logout}
              >
                {" "}
                Logout{" "}
              </button>
            )}{" "}
          </div>
        </div>

        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="#"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <picture>
                <svg className="bi" width="30" height="30"></svg>
                <span className="text-muted">
                  <img src="gorilla.jpg" alt="qq" />
                </span>
              </picture>
            </a>

            <a
              href="https://leetcode.com/chen3210g/"
              target="_blank"
              rel="noreferrer"
              style={style.styleForLeetCodeIcon}
            >
              <picture>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/leetcode-3521542-2944960.png"
                  width="50"
                  height="50"
                  alt="NG"
                />
              </picture>
            </a>

            <a
              href="https://github.com/iamsad5566"
              target="_blank"
              rel="noreferrer"
              style={style.styleForLeetCodeIcon}
            >
              <picture>
                <img
                  src="https://github.githubassets.com/apple-touch-icon-60x60.png"
                  width="50"
                  height="50"
                  alt="NG"
                />
              </picture>
            </a>

            <a
              href="https://www.linkedin.com/in/tw-uriah-chen/"
              target="_blank"
              rel="noreferrer"
              style={style.styleForLeetCodeIcon}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                fill="rgb(2, 149, 231)"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          </div>

          <ul
            className="nav col-md-4 justify-content-end list-unstyled d-flex"
            style={style.styleForFooter}
          >
            <li className="ms-3" style={style.styleForFooterText}>
              <h5>Contact me:</h5>
            </li>

            <li className="ms-3" style={style.styleForIcon}>
              <a
                className="text-muted"
                href="https://www.facebook.com/sam.chen.75491/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="#1E90FF"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
            </li>

            <li className="ms-3">
              <a className="text-muted" href="mailto:chen3210g@gmail.com">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default Home;
