import axios from "axios";
import Setting from "../../setting";

class BlogService {
  setting = new Setting();
  address = this.setting.prefixAddress;
  config = {
    headers: { Authorization: "", withCredentials: true },
  };

  saveToken(token) {
    this.config.headers.Authorization = token;
  }

  getAllArticles(category, visited) {
    console.log(visited);
    return axios.get(
      this.address + `article/getAllArticles/${category}`,
      this.config
    );
  }

  getRowsByCategory(category, visited) {
    return axios.get(
      this.address +
        `article/get_rows_by_category/${category}?visited=${visited}`,
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

  getSingleArticle(postId, visited) {
    return axios.get(
      this.address + `article/getSingleArticle/${postId}?visited=${visited}`,
      this.config
    );
  }

  updatePost(title, content, postId, category) {
    return axios.put(
      this.address + "article/updateArticle",
      { title: title, content: content, postId: postId, category: category },
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

  saveArticle(title, content, category) {
    return axios.post(
      this.address + "article/saveArticle",
      { title: title, content: content, category: category },
      this.config
    );
  }

  deleteArticle(title) {
    return axios.delete(
      this.address + `article/deleteArticle/${title}`,
      this.config
    );
  }
}
export default BlogService;
