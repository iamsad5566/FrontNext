import React from "react";
import Categories from "./categories";

const CategoryIndex = (props) => {
  const { width, handleCategory, postCategory } = props;
  let categories = new Categories();
  let key = 0;

  return (
    <React.Fragment>
      {width <= 1000 ? (
        <div>
          <h2 style={{ display: "inline", fontSize: "1.8em" }}>Category:</h2>
          <select
            style={{
              marginLeft: "1em",
              fontSize: "1.5em",
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
            onClick={(event) => handleCategory(event)}
          >
            {categories.all.map((category) => {
              return (
                <li className="categoryPointer" key={key++}>
                  <option style={{ display: "inline-block" }} value={category}>
                    {" "}
                    {category}{" "}
                  </option>
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
