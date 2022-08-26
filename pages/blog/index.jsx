import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BlogInterface from "../../component/blogPage/blogInterface";
import NavBar from "../../component/navbar";

const Blog = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>YK's blog</title>
        <meta property="og:url" content="https://tw-yk.com/blog" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:description" content="Welcome to my blog!" />
        <meta property="og:title" content="YK's blog" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/blog.jpg" />
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
      </Helmet>
      <NavBar />
      <BlogInterface />
    </HelmetProvider>
  );
};

export default Blog;
