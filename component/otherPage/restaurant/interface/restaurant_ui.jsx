import React, { useState } from "react";

const RestaurantUI = () => {
  const commentStyle = {
    marginTop: "1em",
    width: "80%",
  };

  const styleForContainer = {
    width: "100%",
    height: "100vh",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [commentList, setCommentList] = useState([
    <input placeholder="請輸入評論" style={commentStyle} />,
  ]);
  let comment = <input placeholder="請輸入評論" style={commentStyle} />;

  const handlePlusComments = () => {
    setCommentList((list) => [...list, comment]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="ui" style={styleForContainer}>
        <form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <div className="segment">
            <div style={{ display: "flex" }}>
              <span style={{ width: "50%" }}>
                <button style={{ width: "50%" }}> Insert </button>
              </span>
              <span style={{ width: "50%" }}>
                <button style={{ width: "50%" }}> Get </button>
              </span>
            </div>
          </div>

          <label>
            <input placeholder="餐廳名稱" />
          </label>
          <div style={{ display: "flex" }}>
            <label>
              經度:
              <input placeholder="GisX" style={{ width: "90%" }} />
            </label>
            <label>
              緯度:
              <input placeholder="GisY" style={{ width: "90%" }} />
            </label>
            <label>
              星星數:
              <input placeholder="Stars" style={{ width: "90%" }} />
            </label>
          </div>
          <label>
            {commentList.map((comment) => {
              return comment;
            })}
            <button className="unit" type="button" onClick={handlePlusComments}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </label>

          <div className="input-group">
            <label>
              <input type="text" placeholder="Email Address" />
            </label>
            <button className="unit" type="button">
              <i className="icon ion-md-search"></i>
            </button>
          </div>

          <button className="red" type="button">
            <i className="fas fa-cloud"></i> Save
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default RestaurantUI;
