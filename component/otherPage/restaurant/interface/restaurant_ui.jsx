import React, { useState } from "react";
import RestaurantService from "../../../../api/RestaurantService";

const RestaurantUI = () => {
  const [commentList, setCommentList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [types, setTypes] = useState([]);
  const [hours, setHours] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  const commentStyle = {
    marginTop: "1em",
    width: "80%",
  };

  const styleForContainer = {
    width: "100%",
    height: "auto",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
  };

  const handlePlus = (list) => {
    if (list == commentList) {
      setCommentList([...list, ""]);
    } else if (list == urlList) {
      setUrlList([...list, ""]);
    } else if (list == types) {
      setTypes([...list, ""]);
    }
  };

  const handleUpdate = (list, index, newContent) => {
    const updatedList = list.map((content, i) =>
      i === index ? newContent : content
    );
    if (list == commentList) {
      setCommentList(updatedList);
    } else if (list == urlList) {
      setUrlList(updatedList);
    } else if (list == types) {
      setTypes(updatedList);
    }
  };

  const handleRemove = (list, index) => {
    const updatedList = list.filter((_, i) => i !== index);
    if (list == commentList) {
      setCommentList(updatedList);
    } else if (list == urlList) {
      setUrlList(updatedList);
    } else if (list == types) {
      setTypes(updatedList);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: e.target[2].value,
      latlng: {
        x: parseFloat(e.target[3].value),
        y: parseFloat(e.target[4].value),
      },
      stars: parseFloat(e.target[5].value),
      comments: commentList,
      pictures: urlList,
      types: types,
      hours: hours,
    };
    if (data.name == "") {
      alert("name can't be empty");
      return;
    } else if (data.latlng.x == "") {
      alert("經度 can't be empty");
      return;
    } else if (data.latlng.y == "") {
      alert("緯度 can't be empty");
      return;
    } else if (data.stars == "") {
      alert("星星數 can't be empty");
      return;
    } else if (commentList.length == 0) {
      alert("評論 can't be empty");
      return;
    } else if (urlList.length == 0) {
      alert("URL can't be empty");
      return;
    } else if (types.length == 0) {
      alert("餐廳類別 can't be empty");
      return;
    } else if (
      hours.Monday == "" ||
      hours.Tuesday == "" ||
      hours.Wednesday == "" ||
      hours.Thursday == "" ||
      hours.Friday == "" ||
      hours.Saturday == "" ||
      hours.Sunday == ""
    ) {
      alert("請檢查營業時間");
      return;
    }
    let restaurantService = new RestaurantService();
    let saved = await restaurantService.insert(data);
    if (saved) {
      alert("done!");
      window.location.reload();
    } else {
      alert("error!");
    }
  };

  return (
    <React.Fragment>
      <div className="ui" style={styleForContainer}>
        <form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <div className="segment">
            <div style={{ display: "flex" }}>
              <span style={{ width: "50%" }}>
                <button style={{ width: "90%" }}> Insert </button>
              </span>
              <span style={{ width: "50%" }}>
                <button style={{ width: "90%" }}> Get </button>
              </span>
            </div>
          </div>

          <label>
            <input name="restaurantName" placeholder="餐廳名稱" />
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

          <div style={{ display: "flex", marginTop: "1em" }}>
            <span style={{ width: "25%", marginTop: "1em" }}>
              <button
                className="unit"
                type="button"
                onClick={() => {
                  handlePlus(commentList);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </span>
            <span style={{ width: "70%" }}>
              {commentList.length > 0 ? (
                <div>
                  {commentList.map((comment, index) => (
                    <span key={index}>
                      <input
                        placeholder="請輸入評論"
                        style={commentStyle}
                        value={comment}
                        onChange={(e) =>
                          handleUpdate(commentList, index, e.target.value)
                        }
                      />
                      <button
                        className="unit"
                        type="button"
                        onClick={() => handleRemove(commentList, index)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ marginTop: "2em" }}>點擊 ＋ 新增評論</p>
              )}
            </span>
          </div>

          <div style={{ display: "flex", marginTop: "3em" }}>
            <span style={{ width: "25%", marginTop: "1em" }}>
              <button
                className="unit"
                type="button"
                onClick={() => {
                  handlePlus(urlList);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </span>
            <span style={{ width: "70%" }}>
              {urlList.length > 0 ? (
                <div>
                  {urlList.map((url, index) => (
                    <span key={index}>
                      <input
                        placeholder="請輸入 URL"
                        style={commentStyle}
                        value={url}
                        onChange={(e) =>
                          handleUpdate(urlList, index, e.target.value)
                        }
                      />
                      <button
                        className="unit"
                        type="button"
                        onClick={() => handleRemove(urlList, index)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ marginTop: "2em" }}>點擊 ＋ 新增照片 URL </p>
              )}
            </span>
          </div>

          <div style={{ display: "flex", marginTop: "3em" }}>
            <span style={{ width: "25%", marginTop: "1em" }}>
              <button
                className="unit"
                type="button"
                onClick={() => {
                  handlePlus(types);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </span>
            <span style={{ width: "70%" }}>
              {types.length > 0 ? (
                <div>
                  {types.map((type, index) => (
                    <span key={index}>
                      <input
                        placeholder="請輸入餐廳類別"
                        style={commentStyle}
                        value={type}
                        onChange={(e) =>
                          handleUpdate(types, index, e.target.value)
                        }
                      />
                      <button
                        className="unit"
                        type="button"
                        onClick={() => handleRemove(types, index)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ marginTop: "2em" }}>點擊 ＋ 新增餐廳類別 </p>
              )}
            </span>
          </div>
          <label style={{ marginTop: "5em" }}>
            {" "}
            <h3>營業時間</h3>
            <div style={{ display: "flex", marginTop: "2em" }}>
              <label>
                週一:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Monday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
              <label>
                週二:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Tuesday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
              <label>
                週三:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Wednesday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
              <label>
                週四:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Thursday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
              <label>
                週五:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Friday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
              <label>
                週六:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Saturday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
              <label>
                週日:
                <input
                  placeholder="5:30–10:30 PM"
                  style={{ width: "90%" }}
                  onChange={(event) => {
                    setHours((hours) => {
                      hours.Sunday = event.target.value;
                      return hours;
                    });
                  }}
                />
              </label>
            </div>
          </label>

          <button className="red" type="submit">
            <i className="fas fa-cloud"></i> Save
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default RestaurantUI;
