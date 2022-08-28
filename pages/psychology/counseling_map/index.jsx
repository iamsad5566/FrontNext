import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../../../component/navbar";
import TaiwanMap from "../../../component/psyPage/counselingMap/twMap";
import * as d3 from "d3";

const CounselingInterface = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Counselling resource</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/psychology/counseling_map"
        />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="Couselling information here, feel free to browse and take it!"
        />
        <meta property="og:title" content="Counselling resource" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
        <link rel="icon" href="/psy.ico" type="image/x-icon" />
      </Helmet>
      <NavBar />
      <TaiwanMap />
    </HelmetProvider>
  );
};

export default CounselingInterface;
