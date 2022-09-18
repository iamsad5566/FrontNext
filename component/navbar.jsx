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
        <Script
          src="https://kit.fontawesome.com/a076d05399.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
          strategy="beforeInteractive"
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
