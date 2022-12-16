import React, { useEffect, useState } from "react";
import Categories from "./categories";
import CardInteract from "./cardInteract";
import CardCategory from "./cardCategory";

const CategoryIndex = (props) => {
  const { width, handleCategory, postCategory, handleCategoryByText } = props;
  const [showing, setShowing] = useState(false);
  const showCategory = () => {
    switch (showing) {
      case false:
        setShowing(true);
        break;
      case true:
        setShowing(false);
        break;
    }
  };
  let categories = new Categories();
  let key = 0;

  useEffect(() => {
    let floating = () => {
      let floatingWindow = document.getElementById("floatingCategory");
      if (floatingWindow == null) {
        return;
      }

      if (window.scrollY > 400) {
        floatingWindow.style.position = "fixed";
        floatingWindow.style.top = window.innerHeight / 4 + "px";
      } else {
        floatingWindow.style.top = null;
      }
    };

    let rightFloating = () => {
      let right = document.getElementById("category");

      if (right == null) {
        return;
      }

      if (window.scrollY > 400) {
        right.style.position = "fixed";
        right.style.top = window.innerHeight / 4 + "px";
      } else {
        right.style.top = null;
      }
    };

    window.addEventListener("scroll", floating);
    window.addEventListener("scroll", rightFloating);

    return () => {
      window.removeEventListener("scroll", floating);
      window.removeEventListener("scroll", rightFloating);
    };
  }, []);

  return (
    <React.Fragment>
      {width <= 1440 ? (
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
        <React.Fragment>
          <div
            id="floatingCategory"
            style={{
              position: "fixed",
              margin: `0em 0em 0em ${width <= 1800 ? 0 : width / 15}px`,
              lineHeight: "1.5",
              textAlign: "left",
            }}
          >
            <CardInteract showCategory={showCategory} showing={showing} />
          </div>
          <div
            id="category"
            style={{
              marginTop: "6.5em",
              margin: `0em 0em 0em ${
                width <= 1800 ? width - 370 : width - 560
              }px`,
              position: "fixed",
            }}
          >
            <CardCategory
              showing={showing}
              handleCategoryByText={handleCategoryByText}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CategoryIndex;
