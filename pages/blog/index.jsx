import Head from "next/head";
import React from "react";
import BlogInterface from "../../component/blogPage/blogInterface";
import NavBar from "../../component/navbar";
import AuthenticationService from "../../api/AuthenticationService";

const Blog = () => {
  return (
    <React.Fragment>
      <Head>
        <title>YK&apos;s blog</title>
        <meta property="og:url" content="https://tw-yk.com/blog" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:description" content="Welcome to my blog!" />
        <meta property="og:title" content="YK's blog" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/blog.jpg" />
        <link rel="icon" href="/chick.ico" type="image/x-icon" />
      </Head>
      <NavBar />
      <BlogInterface />
    </React.Fragment>
  );
};

export default Blog;

export const getPostData = async (id) => {
  let authenticationService = new AuthenticationService();
  let token = "";
  await authenticationService.login("guest", "guest").then((response) => {
    token = authenticationService.createToken(response.data.token);
  });

  const res = await fetch(
    `https://tw-yk.website:81/article/getSingleArticle/${id}?visited=true`,
    {
      headers: { Authorization: token },
    }
  );

  const article = await res.json();
  return article;
}