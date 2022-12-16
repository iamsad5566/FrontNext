import React from "react";
import Categories from "./categories";

const CardCategory = (props) => {
  let { width, height, size, showing, handleCategoryByText } = props;
  let show = "flip-card-container-s";
  let fix = "flip-card-container-f";
  let key = 0;
  let categories = new Categories();

  return (
    <div className="reverse-container">
      <div
        className={showing ? show : fix}
        style={{ width: width, height: height }}
      >
        <div className="flip-card">
          <div className="card-back">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="Brohm Lake"
              />
              <figcaption
                style={{ fontSize: size * 0.8 + "em", padding: "0em" }}
              >
                Category
              </figcaption>
            </figure>
            <span
              style={{
                color: "white",
                fontSize: size * 1.2 + "em",
                paddingTop: size * 1 + "em",
                textAlign: "left",
                marginLeft: -size + "em",
                lineHeight: size * 1.5 + "em",
              }}
            >
              {categories.all.map((category) => {
                return (
                  <p
                    key={key++}
                    className="categoryPointer"
                    onClick={() => handleCategoryByText(category)}
                  >
                    {category}
                  </p>
                );
              })}
            </span>
          </div>

          <div className="card-front">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="Brohm Lake"
              />
            </figure>
            <div className="design-container">
              <span className="design design--1"></span>
              <span className="design design--2"></span>
              <span className="design design--3"></span>
              <span className="design design--4"></span>
              <span className="design design--5"></span>
              <span className="design design--6"></span>
              <span className="design design--7"></span>
              <span className="design design--8"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;
