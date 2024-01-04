import axios from "axios";

class RestaurantService {
  login = async (user, password) => {
    let response = await axios
      .post("https://tw-yk.website:888/auth/login", {
        account: user,
        password: password,
      })
      .catch(() => {
        return false;
      });
    if (
      response.status == 200 &&
      typeof window !== "undefined" &&
      window.sessionStorage
    ) {
      sessionStorage.setItem(
        "restaurantToken",
        `Bearer ${response.data["content"]}`
      );
      return true;
    }
    return false;
  };

  insert = async (data) => {
    let response = await axios
      .post(
        "https://tw-yk.website:888/restaurant/insert_new",
        { name: data.name },
        {
          headers: {
            Authorization: sessionStorage.getItem("restaurantToken"),
          },
        }
      )
      .catch((e) => {
        console.log(e);
        return false;
      });
    if (response.status == 200) {
      return true;
    }
    return false;
  };

  getOne = async (data) => {
    return axios.post(
      "https://tw-yk.website:888/restaurant/get_by_name",
      { name: data.name },
      {
        headers: {
          Authorization: sessionStorage.getItem("restaurantToken"),
        },
      }
    );
  };

  removeOne = async (data) => {
    return axios.delete(
      "https://tw-yk.website:888/restaurant/delete_by_name",
      { name: data.name },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("restaurantToken")}`,
        },
      }
    );
  };
}

export default RestaurantService;
