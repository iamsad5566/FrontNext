import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavBar from "../navbar";
import Categories from "./category/categories";
import MDEditor from "./mdEditor";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  let categories = new Categories();
  let key = 0;
  document.title = "Add post";

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <script src="https://kit.fontawesome.com/a076d05399.js" async />
      </Helmet>
      <NavBar />
      <div style={{ marginTop: "3em" }}></div>
      <h1
        style={{
          textAlign: "center",
          margin: "1em",
          fontFamily: "fantasy",
          fontSize: "2.5em",
        }}
      >
        {" "}
        <i>New post</i>{" "}
      </h1>

      <div style={{ textAlign: "center" }}>
        <label style={{ width: "100%", display: "inline-block" }}>
          {" "}
          <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>Title: </span>
          <div></div>
          <input
            value={title}
            onChange={(event) => handleChange(event)}
            style={{
              width: "85%",
              height: "2em",
              padding: "1em",
              margin: "1em 0em 1em",
            }}
          />
        </label>
      </div>

      <div style={{ textAlign: "center" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
          Category:{" "}
        </span>
        <div></div>
        <select onChange={(event) => handleCategory(event)} value={category}>
          {categories.all.map((category) => {
            return (
              <option key={key++} name={category}>
                {" "}
                {category}{" "}
              </option>
            );
          })}
        </select>
      </div>

      <div style={{ margin: "1em 0em 5em 0em" }}>
        <MDEditor title={title} category={category} />
      </div>
    </HelmetProvider>
  );
};

export default AddPost;
