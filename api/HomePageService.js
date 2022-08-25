import Setting from "../../setting";
import axios from "axios";
import AuthenticationService from "./AuthenticationService";

class HomePageService {
  setting = new Setting();
  address = this.setting.prefixAddress;
  authenticationService = new AuthenticationService();
  config = {
    headers: { Authorization: "" },
  };

  saveToken(token) {
    this.config.headers.Authorization = token;
  }

  saveWork(title, url, iconUrl) {
    return axios.post(
      this.address + "work/saveWork",
      {
        title: title,
        url: url,
        iconUrl: iconUrl,
      },
      this.config
    );
  }

  getWorks() {
    return axios.get(this.address + "works/getAllWorks", this.config);
  }

  deleteWork(title) {
    return axios.delete(
      this.address + `works/deleteWork/${title}`,
      this.config
    );
  }

  getIntro() {
    return axios.get(this.address + "getIntro", this.config);
  }

  updateIntro(content) {
    return axios.post(
      this.address + "updateIntro",
      { content: content },
      this.config
    );
  }
}

export default HomePageService;
