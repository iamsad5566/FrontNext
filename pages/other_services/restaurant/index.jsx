import Head from "next/head";
import React, { useEffect } from "react";
import NavBar from "../../../component/navbar";

const RestaurantInterface = () => {
    return (
        <React.Fragment>
          <Head>
            <title>restaurant</title>
            <meta
              property="og:url"
              content="https://tw-yk.com/other_services/restaurant"
            />
            <meta property="og:locale" content="en_US" />
            <meta
              property="og:description"
              content="Here's an UI for inserting new restaurant for the What to Eat APP"
            />
            <meta property="og:title" content="restaurant" />
            <meta property="og:type" content="website" />
            <meta property="fb:admins" content="153906327962277" />
            <meta property="og:image" content="https://tw-yk.com/hermes.png" />
            <link rel="icon" href="/mailCat.ico" type="image/x-icon" />
          </Head>
          <NavBar />
          
        </React.Fragment>
      );
}

export default RestaurantInterface;