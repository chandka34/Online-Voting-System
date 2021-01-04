import GenericService from "./GenericService";
class PostService extends GenericService {
  constructor() {
    super();
  }
  addPost = (id,data) => this.post("posts/" +id, data);
  deletePost = (_id) => this.delete("posts/" + _id);
  updatePost = (_id, data) => this.put("posts/" + _id, data);
  getPosts = (id) => this.get("posts/" + id);
  getSinglePost = (id) => this.get("posts/" + id);
}

let PostsService = new PostService();
export default PostsService