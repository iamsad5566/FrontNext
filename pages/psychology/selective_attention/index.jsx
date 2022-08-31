import Head from "next/head";
import React from "react";
import SelectiveAttentionEntry from "../../../component/psyPage/selectiveAttention/selectiveAttentionEntry";

const SelectiveAttentionInterface = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Stroop effect exp</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/psychology/selective_attention"
        />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:description" content="Selective attention" />
        <meta property="og:title" content="Selective attention exp" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/hermes.png" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
        <link rel="icon" href="/psy.ico" type="image/x-icon" />
      </Head>
      <SelectiveAttentionEntry />
    </React.Fragment>
  );
};

export default SelectiveAttentionInterface;
