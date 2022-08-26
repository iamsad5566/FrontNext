import axios from "axios";
import Setting from "../../setting";

class BlogService {
  setting = new Setting();
  address = this.setting.prefixAddress;
  config = {
    headers: { Authorization: "" },
  };

  saveToken(token) {
    this.config.headers.Authorization = token;
  }

  getAllArticles(category) {
    return axios.get(
      this.address + `article/getAllArticles/${category}`,
      this.config
    );
  }

  getRowsByCategory(category) {
    return axios.get(
      this.address + `article/get_rows_by_category/${category}`,
      this.config
    );
  }

  getPageContent(offset, pageSize, category) {
    return axios.post(
      this.address + `article/get_page_content`,
      { offset: offset, pageSize: pageSize, category: category },
      this.config
    );
  }

  getSingleArticle(postId) {
    return axios.get(
      this.address + `article/getSingleArticle/${postId}`,
      this.config
    );
  }

  getBlogBrowse() {
    return axios.get(this.address + `article/getBlogBrowse`, this.config);
  }

  getArticleBrowse(postId) {
    return axios.get(
      this.address + `article/getArticleBrowse?postId=${postId}`,
      this.config
    );
  }
}
export default BlogService;