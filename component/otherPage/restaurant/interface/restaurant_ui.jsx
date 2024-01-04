import React, { useState } from "react";
import RestaurantService from "../../../../api/RestaurantService";
import Insert from "./ui_component/insert";
import Get from "./ui_component/get";

const RestaurantUI = () => {
  let restaurantService = new RestaurantService();
  const [currentSession, setSession] = useState("insert");
  const [commentList, setCommentList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [types, setTypes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    stars: "",
    hours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
  });

  const [cacheRestaurant, setCacheRestaurant] = useState({
    name: "",
    data: [],
  });

  const styleForContainer = {
    width: "100%",
    height: "auto",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlehours = (day, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hours: {
        ...prevFormData.hours,
        [day]: value,
      },
    }));
  };

  const handleCache = (e) => {
    const { name, value } = e.target;
    setCacheRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSwitch = (event) => {
    setSession(event.target.name);
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

    let saved = await restaurantService.insert(data);
    if (saved) {
      alert("done!");
    } else {
      alert("error!");
    }
  };

  const handleSearch = (data) => {
    restaurantService
      .getOne(data)
      .then((response) => {
        if (response.status == 200) {
          setCacheRestaurant((prev) => ({
            ...prev,
            data: response.data.result,
          }));
          if (response.data.result.length == 0) {
            alert("No data");
          }
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleDelete = (data) => {
    if (confirm("sure?")) {
      restaurantService
        .removeOne(data)
        .then(
          setCacheRestaurant((prev) => ({
            ...prev,
            data: [],
          }))
        )
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    <React.Fragment>
      <div className="ui" style={styleForContainer}>
        <form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <div className="segment">
            <div style={{ display: "flex" }}>
              <span style={{ width: "50%" }}>
                <button
                  type="button"
                  name="insert"
                  style={{ width: "90%" }}
                  onClick={(e) => {
                    handleSwitch(e);
                  }}
                >
                  {" "}
                  Insert{" "}
                </button>
              </span>
              <span style={{ width: "50%" }}>
                <button
                  type="button"
                  name="get"
                  style={{ width: "90%" }}
                  onClick={(e) => {
                    handleSwitch(e);
                  }}
                >
                  {" "}
                  Get{" "}
                </button>
              </span>
            </div>
          </div>
          {currentSession == "insert" ? (
            <Insert
              commentList={commentList}
              urlList={urlList}
              types={types}
              handlePlus={handlePlus}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
              formData={formData}
              handleChange={handleChange}
              handlehours={handlehours}
            />
          ) : (
            <Get
              cacheRestaurant={cacheRestaurant}
              handleCache={handleCache}
              handleSearch={handleSearch}
              handleDelete={handleDelete}
            />
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default RestaurantUI;
