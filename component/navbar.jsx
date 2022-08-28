import Link from "next/link";
import React from "react";

const NavBar = () => {
  const handleClick = () => {
    document.getElementById("menuBar").click();
  };

  return (
    <React.Fragment>
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
