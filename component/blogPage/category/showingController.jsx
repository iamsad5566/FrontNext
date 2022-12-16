import React, { useEffect, useState } from "react";
import Card from "./card";
import Selecting from "./selecting";

const ShowingController = (props) => {
  const { handleCategory, postCategory, handleCategoryByText } = props;
  let [output, setOutput] = useState(
    <Card handleCategoryByText={handleCategoryByText} />
  );

  useEffect(() => {
    let autoSize = () => {
      let width = window.innerWidth;
      if (width < 1200) {
        setOutput(
          <Selecting
            handleCategory={handleCategory}
            postCategory={postCategory}
          />
        );
      } else {
        setOutput(<Card handleCategoryByText={handleCategoryByText} />);
      }
    };

    window.addEventListener("resize", autoSize);

    return () => {
      window.removeEventListener("resize", autoSize);
    };
  }, []);
  return <React.Fragment>{output}</React.Fragment>;
};

export default ShowingController;
