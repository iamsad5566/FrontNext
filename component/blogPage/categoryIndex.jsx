import React, { useEffect } from "react";
import Categories from "./categories";

const CategoryIndex = (props) => {
  const { width, handleCategory, postCategory, handleCategoryByText } = props;
  let categories = new Categories();
  let key = 0;

  useEffect(() => {
    let floating = () => {
      let floatingWindow = document.getElementById("floatingCategory");

      if (window.scrollY > 350) {
        floatingWindow.style.position = "fixed";
        floatingWindow.style.top = window.innerHeight / 3 + "px";
      } else {
        floatingWindow.style.top = null;
      }
    };
    window.addEventListener("scroll", floating);

    return () => {
      window.removeEventListener("scroll", floating);
    };
  }, []);

  return (
    <React.Fragment>
      {width <= 1000 ? (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ display: "inline", fontSize: "1.5em" }}>Category:</h2>
          <select
            style={{
              marginLeft: "1em",
              fontSize: "1.2em",
              width: "6em",
              textAlign: "center",
            }}
            value={postCategory}
            onChange={(event) => handleCategory(event)}
          >
            {categories.all.map((category) => {
              return (
                <option value={category} key={key++}>
                  {" "}
                  {category}{" "}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div
          id="floatingCategory"
          style={{
            position: "fixed",
            margin: `5em 0em 0em ${width <= 1800 ? width / 50 : width / 15}px`,
            lineHeight: "2",
            textAlign: "left",
          }}
        >
          <h3>文章分類：</h3>
          <ul
            style={{
              marginTop: "1em",
              listStylePosition: "inside",
              fontSize: "1.5em",
            }}
          >
            {categories.all.map((category) => {
              return (
                <li key={key++}>
                  <p
                    className="categoryPointer"
                    style={{ display: "inline-block" }}
                    value={category}
                    onClick={() => handleCategoryByText(category)}
                  >
                    {category}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default CategoryIndex;
