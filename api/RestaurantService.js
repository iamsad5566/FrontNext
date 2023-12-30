import axios from "axios";

class RestaurantService {
     login = async (user, password)  => {
        let response = await axios.post("https://tw-yk.website:888/auth/login", 
        {account:user, password:password});
        if (response.status == 200 && typeof window !== "undefined" && window.sessionStorage) {
            sessionStorage.setItem("restaurantToken" ,`Bearer ${response.data["content"]}`);
        }
    }
}

export default RestaurantService;