import axios from "axios";
import Setting from "../../setting";

class PsyGolangService {
  setting = new Setting();
  address = this.setting.goPrefixAddress;

  saveStroopEffectSubject(subject, information) {
    return axios.post(this.address + "stroop_effect/save_subject", {
      subject: subject,
      information: information,
    });
  }

  getStroopEffect(subject) {
    return axios.post(this.address + "stroop_effect/getdata", {
      subject: subject,
    });
  }

  updateStroopEffect(subject, result, conditionAddr) {
    return axios.post(
      this.address +
        "stroop_effect/update_result?conditionAddr=" +
        conditionAddr,
      { subject: subject, result: result }
    );
  }
}

export default PsyGolangService;
