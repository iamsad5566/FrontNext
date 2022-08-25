import Setting from "../../setting";
import axios from "axios";

class AuthenticationService {
  setting = new Setting();
  address = this.setting.prefixAddress;

  // Execute JWT authentication service
  login(userName, userPassword) {
    return axios.post(
      this.address +
        `auth/login?userName=${userName}&userPassword=${userPassword}`
    );
  }

  // Register successfuly login
  registerLogin(userName, token) {
    let jwtToken = this.createToken(token);
    sessionStorage.setItem(userName, jwtToken);
    this.setupAxiosInterceptor(userName);
  }

  // Create token
  createToken(token) {
    return "Bearer " + token;
  }

  // Setup interceptor
  setupAxiosInterceptor(userName) {
    let token = sessionStorage.getItem(userName);
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = token;
      return config;
    });
  }

  // Return if admin user has logged in
  isLoggedIn() {
    let user = sessionStorage.getItem(this.setting.admin);
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }

  // Handle logout
  logout() {
    sessionStorage.removeItem(this.setting.admin);
    return axios.get(this.address + "auth/logout");
  }
}

export default AuthenticationService;
