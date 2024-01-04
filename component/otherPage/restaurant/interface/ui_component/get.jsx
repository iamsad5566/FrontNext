import React from "react";

const Get = ({ cacheRestaurant, handleCache, handleSearch, handleDelete }) => {
  let k = 0;
  let counter = 0;
  return (
    <React.Fragment>
      <label style={{ marginTop: "1em" }}>
        <input
          name="name"
          placeholder="餐廳名稱"
          autoComplete="off"
          value={cacheRestaurant.name}
          onChange={(e) => handleCache(e)}
          style={{ width: "60%" }}
        />
        <button type="button" onClick={() => handleSearch(cacheRestaurant)}>
          GO
        </button>
      </label>
      {cacheRestaurant.data.map((e) => (
        <div key={k++}>
          <div
            className="container"
            style={{ height: "auto", textAlign: "center", display: "flex" }}
          >
            <span style={{ width: "20%" }}></span>
            <span style={{ width: "60%" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ marginTop: "1em" }}>
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    店名:
                  </p>{" "}
                  {e.name}
                </div>
                <div style={{ marginTop: "1em" }}>
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    經緯度:
                  </p>{" "}
                  {`${e.latlng.y}, ${e.latlng.x}`}
                </div>
                <div style={{ marginTop: "1em" }}>
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    分數:
                  </p>{" "}
                  {e.stars}
                </div>
                <div style={{ marginTop: "1em", display: "flex" }}>
                  <span style={{ width: "10%" }}>
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        display: "inline",
                      }}
                    >
                      照片:
                    </p>{" "}
                  </span>
                  <span style={{ width: "90%" }}>
                    {e.pictures.map((url) => (
                      <div key={k++} style={{ marginBottom: "0.5em" }}>
                        <a href={url} target="_blank">
                          {`picture: ${k + 1}`}
                        </a>
                      </div>
                    ))}
                  </span>
                </div>

                <div style={{ marginTop: "1em", display: "flex" }}>
                  <span style={{ width: "10%" }}>
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        display: "inline",
                      }}
                    >
                      評論:
                    </p>{" "}
                  </span>
                  <ol style={{ width: "90%", marginTop: "0.05em" }}>
                    {e.comments.map((text) => (
                      <li key={k++}>
                        <p>{text}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div style={{ marginTop: "1em", display: "flex" }}>
                  <span style={{ width: "10%" }}>
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        display: "inline",
                      }}
                    >
                      類別:
                    </p>{" "}
                  </span>
                  <span style={{ width: "90%" }}>
                    {e.types.map((ee) => {
                      counter++;
                      return (
                        <p style={{ display: "inline" }} key={k++}>
                          {ee}
                          {counter == e.types.length ? "" : ","}{" "}
                        </p>
                      );
                    })}
                  </span>
                </div>
                <div style={{ marginTop: "1em" }}>
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    營業時間:
                  </p>{" "}
                  <ul>
                    <li>週一: {e.hours.Monday}</li>
                    <li>週二: {e.hours.Tuesday}</li>
                    <li>週三: {e.hours.Wednesday}</li>
                    <li>週四: {e.hours.Thursday}</li>
                    <li>週五: {e.hours.Friday}</li>
                    <li>週六: {e.hours.Saturday}</li>
                    <li>週日: {e.hours.Sunday}</li>
                  </ul>
                </div>
              </div>
            </span>
            <span style={{ width: "20%" }}></span>
          </div>
          <div style={{ marginTop: "1.5em" }}>
            <button
              className="btn btn-danger"
              type="button"
              style={{
                fontSize: "1.2em",
                width: "5em",
              }}
              onClick={() => handleDelete(cacheRestaurant)}
            >
              <span>刪除</span>
            </button>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Get;
