import React from "react";

const CardInteract = (props) => {
  const { width, height, size, showCategory, showing } = props;
  return (
    <div
      className="flip-card-container"
      style={{ width: width + "px", height: height + "px", zIndex: 3 }}
    >
      <div className="flip-card">
        <div className="card-front">
          <figure id="card-figure">
            <div className="img-bg"></div>
            <img
              src="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="Image-3"
            />
            <figcaption style={{ fontSize: size * 0.8 + "em", padding: "0em" }}>
              Autumn
            </figcaption>
          </figure>
          <p
            style={{
              color: "white",
              fontFamily: "cursive",
              fontSize: size + "em",
              paddingTop: size * 1 + "em",
            }}
          >
            {" "}
            Wish you have a good day
          </p>
        </div>

        <div className="card-back">
          <figure id="card-figure">
            <div className="img-bg"></div>
            <img
              src="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="image-2"
            />
          </figure>

          <button
            style={{ fontSize: size + "em", zIndex: 1 }}
            onClick={() => showCategory()}
          >
            {showing ? "Flip" : "Show"}
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

export default CardInteract;
