import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import React from "react";

const NavBar = () => {
  const handleClick = () => {
    document.getElementById("menuBar").click();
  };

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://kit.fontawesome.com/a076d05399.js"
          strategy="lazyOnload"
        />
      </Head>

      <input type="checkbox" id="active"></input>
      <label htmlFor="active" className="menu-btn">
        <i className="fas fa-bars" id="menuBar"></i>
      </label>
      <div className="wrapper">
        <ul>
          <li>
            <Link href="/">
              <a onClick={handleClick}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/psychology">Psy</Link>
          </li>
          <li>
            <Link href="/other_services">Other services</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
