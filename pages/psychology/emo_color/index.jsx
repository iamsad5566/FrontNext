import Head from "next/head";
import React from "react";
import EmpColorEntry from "../../../component/psyPage/emotionColor/empColorEntry";

const EmoColorInterface = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Emotion x color</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/psychology/emo_color"
        />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="A Psychological experiment for comaring the relationship between emotion and color!"
        />
        <meta property="og:title" content="emotion x color" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/pi512.png" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
        <link rel="icon" href="/psy.ico" type="image/x-icon" />
      </Head>
      <EmpColorEntry />
    </React.Fragment>
  );
};

export default EmoColorInterface;
