import React from "react";
import Categories from "./categories";

const Selecting = (props) => {
  const { handleCategory, postCategory } = props;
  let categories = new Categories();
  let key = 0;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Selecting;
