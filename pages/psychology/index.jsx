import Head from "next/head";
import React from "react";
import NavBar from "../../component/navbar";
import PsyMainContent from "../../component/psyPage/psyMainContent";

const Psychology = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Psy info</title>
        <meta property="og:url" content="https://tw-yk.com/psychology" />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="Psychological information here!"
        />
        <meta property="og:title" content="Psy info" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
        <link rel="icon" href="/psy.ico" type="image/x-icon" />
      </Head>
      <NavBar />
      <PsyMainContent />
    </React.Fragment>
  );
};

export default Psychology;
