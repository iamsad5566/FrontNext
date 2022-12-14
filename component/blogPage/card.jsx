import React from "react";

const Card = (props) => {
  const { showCategory, showing } = props;

  return (
    <div className="flip-card-container">
      <div className="flip-card">
        <div className="card-front">
          <figure>
            <div className="img-bg"></div>
            <img
              src="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="Image-3"
            />
            <figcaption>Autumn</figcaption>
          </figure>
          <p
            style={{
              color: "white",
              fontFamily: "cursive",
              fontSize: "1em",
              paddingTop: "3em",
            }}
          >
            {" "}
            Wish you have a good day
          </p>
        </div>

        <div className="card-back">
          <figure>
            <div className="img-bg"></div>
            <img
              src="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="image-2"
            />
          </figure>

          <button onClick={() => showCategory()}>
            {showing ? "Close" : "Category"}
          </button>

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
  );
};

export default Card;
