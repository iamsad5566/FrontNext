import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../../component/navbar";
import OtherMainContent from "../../component/otherPage/otherMainContent";

const OtherServiceInterface = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>other service</title>
        <meta property="og:url" content="https://tw-yk.com/other_services" />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="Kinds of thoughts tested here!"
        />
        <meta property="og:title" content="other service" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        <link rel="icon" href="/bulb.ico" type="image/x-icon" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
      </Helmet>

      <NavBar />
      <OtherMainContent />
    </HelmetProvider>
  );
};

export default OtherServiceInterface;
