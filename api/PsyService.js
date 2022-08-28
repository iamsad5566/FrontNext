import axios from "axios";
import Setting from "../../setting";

class PsyService {
  setting = new Setting();
  address = this.setting.prefixAddress;
  config = {
    headers: { Authorization: "" },
  };

  saveToken(token) {
    this.config.headers.Authorization = token;
  }

  getList() {
    return axios.get(this.address + "getList", this.config);
  }

  getDataMap(link) {
    return axios.post(this.address + "getDataMap", { link: link }, this.config);
  }
}

export default PsyService;
