import React, { useState } from "react";
import AuthenticationService from "../api/AuthenticationService";
import Link from "next/dist/client/link";
import Head from "next/head";

const Login = () => {
  const [info, setInfo] = useState({ userName: "", password: "" });
  const [loginFailed, setLoginFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const handleChange = (event) => {
    if (loginFailed === true) {
      setLoginFailed(false);
    }

    let tmpInfo = { ...info };
    switch (event.target.name) {
      case "userName":
        tmpInfo.userName = event.target.value;
        setInfo(tmpInfo);
        return;
      case "password":
        tmpInfo.password = event.target.value;
        setInfo(tmpInfo);
        return;
      default:
        return;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    let authenticationService = new AuthenticationService();
    authenticationService
      .login(info.userName, info.password)
      .then((response) => {
        authenticationService.registerLogin(info.userName, response.data.token);
        let now = new Date();
        let expire = new Date();
        expire.setTime(now.getTime() + 36000 * 1000);
        document.cookie =
          info.userName +
          "=" +
          info.password +
          ";expires=" +
          expire.toUTCString() +
          ";path=/";
        setShowMessage(true);
      })
      .catch(() => {
        setLoginFailed(true);
      });
  };

  const styleForContainer = {
    textAlign: "center",
    marginTop: "40vh",
  };

  const styleForUserPasswordInput = {
    display: "block",
    position: "relative",
    marginLeft: "1vh",
    marginTop: "1vh",
  };

  const styleForLoginButton = {
    display: "inline-block",
    position: "relative",
    marginTop: "1em",
  };

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <div style={styleForContainer}>
        <form>
          <span>
            {" "}
            User Name:{" "}
            <input
              type="text"
              name="userName"
              value={info.userName}
              onChange={handleChange}
              autoComplete="off"
            />{" "}
          </span>
          <span style={styleForUserPasswordInput}>
            {" "}
            Password:{" "}
            <input
              type="password"
              name="password"
              value={info.password}
              onChange={handleChange}
              autoComplete="off"
            />{" "}
          </span>
          <span>
            <Link href="/">
              <button
                type="button"
                className="btn btn-danger m-2"
                style={{ borderRadius: "50%" }}
              >
                back
              </button>
            </Link>
          </span>
          <span style={styleForLoginButton}>
            {" "}
            <button
              className="btn btn-warning m-2"
              type="submit"
              onClick={handleClick}
              style={{ borderRadius: "50%" }}
            >
              Login
            </button>{" "}
          </span>
        </form>
        {loginFailed && (
          <div className="alert alert-danger"> Invalid credential! </div>
        )}
        {showMessage && (
          <div className="alert alert-success">
            {" "}
            Welcome back, Yen-Kuang! You can manage your website now, go back to{" "}
            {<Link href="/"> home page </Link>}{" "}
          </div>
        )}
        <div style={{ marginTop: "5em" }}> </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
