import Head from "next/head";
import React from "react";
import NavBar from "../../../../component/navbar";
import NewTemplate from "../../../../component/otherPage/postman/newTemplate";

const AddInterface = () => {
  return (
    <React.Fragment>
      <Head>
        <title>New template</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/other_services/postman"
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
      </Head>
      <NavBar />
      <NewTemplate />
    </React.Fragment>
  );
};

export default AddInterface;
