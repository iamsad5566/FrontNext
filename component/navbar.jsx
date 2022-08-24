import Link from "next/link";
import React from "react";

const NavBar = () => {
  const handleRefresh = () => {
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
            <a href="#" onClick={handleRefresh}>
              Home
            </a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Psy contents</a>
          </li>
          <li>
            <a href="#">Other services</a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
