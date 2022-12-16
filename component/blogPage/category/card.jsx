import React, { useEffect, useState } from "react";
import CardCategory from "./cardCategory";
import CardInteract from "./cardInteract";

const Card = (props) => {
  const { handleCategoryByText } = props;
  const [showing, setShowing] = useState(false);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(450);
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
    setWidth(innerWidth / 7);
    setHeight((innerWidth * 1.6) / 7);
    setSize(innerWidth / 1500);
    let FC = document.getElementById("floating-container");
    let initialH = FC.getBoundingClientRect().top;

    let floating = () => {
      if (FC == null) {
        return;
      }

      let currTop = FC.getBoundingClientRect().top;
      let horiz = innerHeight / 2;
      let fixedAtCenter = horiz - height / 1.8;

      if (scrollY < initialH - fixedAtCenter || currTop > fixedAtCenter) {
        FC.style.top = initialH - scrollY + "px";
      }

      if (scrollY > initialH - fixedAtCenter) {
        FC.style.top = fixedAtCenter + "px";
      }
    };

    let autoSize = () => {
      setWidth(innerWidth / 7);
      setHeight((innerWidth * 1.6) / 7);
      setSize(innerWidth / 1500);
    };

    addEventListener("scroll", floating);
    addEventListener("resize", autoSize);
    addEventListener("resize", floating);

    return () => {
      removeEventListener("scroll", floating);
      removeEventListener("resize", floating);
      removeEventListener("resize", autoSize);
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
