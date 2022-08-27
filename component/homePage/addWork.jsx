import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Setting from "../../../setting";
import HomePageService from "../../api/HomePageService";

const AddWorkComponent = () => {
  const [successful, setSucessful] = useState(false);
  const [unsuccessful, setUnsucessful] = useState(false);
  const [message, setMessage] = useState("");
  let homePageService = new HomePageService();
  let setting = new Setting();

  const onSubmit = (value) => {
    let title = value.title;
    let url = value.url;
    let iconUrl = value.iconUrl;
    homePageService.saveToken(sessionStorage.getItem(setting.admin));
    homePageService
      .saveWork(title, url, iconUrl)
      .then(() => {
        setSucessful(true);
        setMessage("Your post was successful saved!");
      })
      .catch(() => {
        setUnsucessful(true);
        setMessage("There was something wrong!");
      });
  };

  const validate = (value) => {
    let error = {};
    if (value.title.length === 0) {
      error.title = "Please set the title!";
    }

    if (value.url.length === 0) {
      error.url = "Please say something!";
    }

    return error;
  };

  const styleForContainer = {
    textAlign: "center",
  };

  const styleForForm = {
    textAlign: "center",
    width: "100%",
    position: "relative",
    marginTop: "10em",
  };

  const styleForGap = {
    marginTop: "2em",
  };

  const styleForTextArea = {
    height: "50px",
  };

  return (
    <React.Fragment>
      <div className="container" style={styleForContainer}>
        <Formik
          initialValues={{ title: "", url: "", iconUrl: "" }}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {(formProps) => (
            <Form style={styleForForm}>
              <fieldset className="form-group">
                <ErrorMessage
                  className="alert alert-warning"
                  name="title"
                  component="div"
                />
                {successful ? (
                  <div className="alert alert-success">{message}</div>
                ) : (
                  <></>
                )}
                {unsuccessful ? (
                  <div className="alert alert-danger">{message}</div>
                ) : (
                  <></>
                )}
                <label>Title</label>
                <input
                  className="form-control"
                  name="title"
                  onChange={formProps.handleChange}
                  autoComplete="off"
                />
              </fieldset>

              <fieldset className="form-group" style={styleForGap}>
                <ErrorMessage
                  className="alert alert-warning"
                  name="url"
                  component="div"
                />
                <label>url</label>
                <Field
                  className="form-control"
                  component="textarea"
                  name="url"
                  autoComplete="off"
                  style={styleForTextArea}
                />
              </fieldset>

              <fieldset className="form-group" style={styleForGap}>
                <label>iconUrl</label>
                <Field
                  className="form-control"
                  component="textarea"
                  name="iconUrl"
                  autoComplete="off"
                  style={styleForTextArea}
                />
              </fieldset>
              <div style={{ marginTop: "3em" }}></div>
              <Link href="/">
                <button className="btn btn-danger mt-3">Go back</button>
              </Link>
              <button
                className="btn btn-success mt-3"
                type="submit"
                style={{ marginLeft: "3em" }}
              >
                {" "}
                Submit{" "}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default AddWorkComponent;
