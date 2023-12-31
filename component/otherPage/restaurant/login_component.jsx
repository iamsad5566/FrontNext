import React, { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

const LoginComponent = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(3);
  const [info, setInfo] = useState({ userName: "", password: "" });
  const [loginFailed, setLoginFailed] = useState();
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
    // setLoginFailed(true);
    setShowMessage(true);
    setTimer(3);

    let counter = 3;
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      counter--;
      if (counter == 0) {
        clearInterval(countdown);
        setTimeout(() => {
          router.push("/other_services");
        }, 500);
      }
    }, 1000);
  };

  const rowlayout = {
    display: "block",
    position: "relative",
    marginLeft: "1vh",
    marginTop: "1vh",
    width: "20em",
  };

  const styleForLoginButton = {
    display: "inline-block",
    position: "relative",
    marginTop: "2em",
  };

  return (
    <React.Fragment>
      <div
        style={{
          height: "100vh",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "block" }}>
          <div style={{ display: "block" }}>
            {loginFailed && (
              <div className="alert alert-danger"> Invalid credential! </div>
            )}
            {showMessage && (
              <div className="alert alert-success">
                {" "}
                {`Directing... ${timer}s`}
              </div>
            )}
            <form>
              <div style={rowlayout}>
                <span
                  style={{
                    display: "flex",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: "10em",
                    }}
                  >
                    User Name:
                  </span>
                  <span
                    style={{
                      width: "20em",
                      textAlign: "right",
                    }}
                  >
                    <input
                      type="text"
                      name="userName"
                      value={info.userName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    textAlign: "left",
                    marginTop: "1em",
                  }}
                >
                  <span
                    style={{
                      width: "10em",
                    }}
                  >
                    Password:
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={info.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />{" "}
                </span>
              </div>

              <span>
                <Link href="/other_services">
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
                  type="button"
                  onClick={handleClick}
                  style={{ borderRadius: "50%" }}
                >
                  Login
                </button>{" "}
              </span>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginComponent;
