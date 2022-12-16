import React, { useEffect, useState } from "react";
import CardCategory from "./cardCategory";
import CardInteract from "./cardInteract";

const Card = (props) => {
  const { handleCategoryByText } = props;
  const [showing, setShowing] = useState(false);
  const [width, setWidth] = useState("300px");
  const [height, setHeight] = useState("450px");
  const [size, setSize] = useState("1");

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

  useEffect(() => {
    setWidth(innerWidth / 7 + "px");
    setHeight((innerWidth * 1.6) / 7 + "px");
    setSize(innerWidth / 1500);

    let floating = () => {
      let FC = document.getElementById("floating-container");
      if (FC == null) {
        return;
      }
      if (window.scrollY > 400) {
        FC.style.position = "fixed";
        FC.style.top = window.innerHeight / 4 + "px";
      } else {
        FC.style.top = null;
      }
    };

    let autoSize = () => {
      let innerWidth = window.innerWidth;
      setWidth(innerWidth / 7 + "px");
      setHeight((innerWidth * 1.6) / 7 + "px");
      setSize(innerWidth / 1500);
    };

    window.addEventListener("scroll", floating);
    window.addEventListener("resize", autoSize);
    window.addEventListener("resize", floating);

    return () => {
      window.removeEventListener("scroll", floating);
      window.removeEventListener("resize", floating);
      window.removeEventListener("resize", autoSize);
    };
  }, []);
  return (
    <React.Fragment>
      <div
        id="floating-container"
        style={{
          position: "fixed",
          width: "100%",
          height: "auto",
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: "relative",
            width: "50%",
            height: "auto",
            display: "inline-block",
          }}
        >
          <CardInteract
            showCategory={showCategory}
            showing={showing}
            width={width}
            height={height}
            size={size}
          />
        </span>
        <span
          style={{
            position: "relative",
            width: "50%",
            height: "auto",
            display: "inline-block",
            textAlign: "right",
          }}
        >
          <CardCategory
            showing={showing}
            handleCategoryByText={handleCategoryByText}
            width={width}
            height={height}
            size={size}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default Card;
