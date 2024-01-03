import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RestaurantUI from "./restaurant_ui";

const RestaurantController = () => {
  const [processiong, setProcessiong] = useState(true);
  const router = useRouter();
  const styleForLoading = {
    width: "100%",
    height: "100vh",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    if (sessionStorage.getItem("restaurantToken") == undefined) {
      router.push("./");
    } else {
      setProcessiong(false);
    }
  }, []);

  return (
    <React.Fragment>
      {processiong ? (
        <span style={styleForLoading}>
          <svg
            id="loading"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </span>
      ) : (
        <RestaurantUI />
      )}
    </React.Fragment>
  );
};

export default RestaurantController;
