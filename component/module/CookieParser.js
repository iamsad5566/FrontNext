class CookieParser {
  retrieveTargetValue(cookie, name) {
    let value;
    let cookieArr = cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
      if (cookieArr[i].includes(name)) {
        value = cookieArr[i].split("=")[1];
        break;
      }
    }

    return value;
  }

  getPassword(cookie, account) {
    let password = this.retrieveTargetValue(cookie, account);
    return password;
  }

  hasVisited(cookie, page) {
    let value = this.retrieveTargetValue(cookie, page);
    if (value == "visited") {
      return true;
    }

    return false;
  }
}

export default new CookieParser();
