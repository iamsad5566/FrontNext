import axios from "axios";
import Setting from "../../setting";

class OtherPageService {
  setting = new Setting();
  address = this.setting.prefixAddress;
  config = {
    headers: { Authorization: "" },
  };

  saveToken(token) {
    this.config.headers.Authorization = token;
  }

  postman(account, subject, to, date, subjectName, body) {
    return axios.post(
      this.address + "sendMail/",
      {
        from: account,
        subject: subject,
        to: to,
        date: date,
        name: subjectName,
        body: body,
      },
      this.config
    );
  }

  gmailRegister(account, password) {
    return axios.post(
      this.address + `gmailRegister?gmail=${account}&appPassword=${password}`,
      this.config
    );
  }

  checkGmail(account) {
    return axios.post(
      this.address + `gmailCheck?gmail=${account}`,
      this.config
    );
  }

  sendTemplate(key, body) {
    return axios.post(
      this.address + "saveTemplate",
      {
        key: key,
        body: body,
      },
      this.config
    );
  }

  getAllTemplate() {
    return axios.get(this.address + "getTemplates", this.config);
  }

  deleteTemplate(id) {
    return axios.post(
      this.address + `deleteTemplateById?id=${id}`,
      this.config
    );
  }
}

export default OtherPageService;
