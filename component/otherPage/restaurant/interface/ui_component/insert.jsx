import React from "react";

const Insert = ({
  commentList,
  urlList,
  types,
  handlePlus,
  handleRemove,
  handleUpdate,
  formData,
  handlehours,
  handleChange,
}) => {
  const commentStyle = {
    marginTop: "1em",
    width: "80%",
  };
  return (
    <React.Fragment>
      <label>
        <input
          name="name"
          placeholder="餐廳名稱"
          autoComplete="off"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <div style={{ display: "flex" }}>
        <div style={{ display: "block", width: "32%" }}>
          <div>經度:</div>
          <div>
            <input
              name="lng"
              placeholder="GisX"
              value={formData.lng}
              style={{ marginLeft: "1em", width: "60%" }}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div style={{ display: "block", width: "32%" }}>
          <div>緯度:</div>
          <div>
            <input
              name="lat"
              placeholder="GisY"
              value={formData.lat}
              style={{ marginLeft: "1em", width: "60%" }}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div style={{ display: "block", width: "32%" }}>
          <div>星星數:</div>
          <div>
            <input
              name="stars"
              placeholder="Stars"
              value={formData.stars}
              style={{ marginLeft: "1em", width: "60%" }}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "5em" }}>
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    onChange={(e) => handleUpdate(types, index, e.target.value)}
                    autoComplete="off"
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
              name="Monday"
              value={formData.hours.Monday}
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Monday", e.target.value)}
              autoComplete="off"
            />
          </label>
          <label>
            週二:
            <input
              placeholder="5:30–10:30 PM"
              name="Tuesday"
              value={formData.hours.Tuesday}
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Tuesday", e.target.value)}
              autoComplete="off"
            />
          </label>
          <label>
            週三:
            <input
              placeholder="5:30–10:30 PM"
              name="Wednesday"
              value={formData.hours.Wednesday}
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Wednesday", e.target.value)}
              autoComplete="off"
            />
          </label>
          <label>
            週四:
            <input
              placeholder="5:30–10:30 PM"
              value={formData.hours.Thursday}
              name="Thursday"
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Thursday", e.target.value)}
              autoComplete="off"
            />
          </label>
          <label>
            週五:
            <input
              placeholder="5:30–10:30 PM"
              name="Friday"
              value={formData.hours.Friday}
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Friday", e.target.value)}
              autoComplete="off"
            />
          </label>
          <label>
            週六:
            <input
              placeholder="5:30–10:30 PM"
              name="Saturday"
              value={formData.hours.Saturday}
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Saturday", e.target.value)}
              autoComplete="off"
            />
          </label>
          <label>
            週日:
            <input
              placeholder="5:30–10:30 PM"
              name="Sunday"
              value={formData.hours.Sunday}
              style={{ width: "90%" }}
              onChange={(e) => handlehours("Sunday", e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
      </label>
      <button className="red" type="submit">
        <i className="fas fa-cloud"></i> Save
      </button>
    </React.Fragment>
  );
};

export default Insert;
