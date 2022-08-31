import Head from "next/head";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavBar from "../../../../component/navbar";
import ResControl from "../../../../component/psyPage/stroopEffect/result/resControl";
import StroopRes from "../../../../component/psyPage/stroopEffect/result/stroopRes";

const StroopResInterface = (props) => {
  const [query, setQuery] = useState({});
  useEffect(() => {
    setQuery(props.router.query);
  }, [props]);

  return (
    <React.Fragment>
      <Head>
        <title>Stroop result</title>
        <meta
          property="og:url"
          content={
            "https://tw-yk.com/psychology/stroop_effect/result" +
            (query.subject === undefined ? "" : `?subject=${query.subject}`)
          }
        />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="Experiment for stroop effect here"
        />
        <meta property="og:title" content="Stroop effect exp" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/stroop.jpg" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
        <link rel="icon" href="/psy.ico" type="image/x-icon" />
      </Head>
      <NavBar />
      {query.subject == undefined ? <ResControl /> : <StroopRes />}
    </React.Fragment>
  );
};

export default withRouter(StroopResInterface);
