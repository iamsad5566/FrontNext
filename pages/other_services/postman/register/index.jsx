import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../../../../component/navbar";
import RegisterPage from "../../../../component/otherPage/postman/registerPage";

const Register = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>register</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/other_services/postman/register"
        />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:description"
          content="This is a website for sending a batch of mails with the templates from your gmail account to the receiver. please see the instruction for detail"
        />
        <meta property="og:title" content="Postman" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/hermes.png" />
        <link rel="icon" href="/mailCat.ico" type="image/x-icon" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
      </Helmet>
      <NavBar />
      <RegisterPage />
    </HelmetProvider>
  );
};

export default Register;
