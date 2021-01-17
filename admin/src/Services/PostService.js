import GenericService from "./GenericService";
class PostService extends GenericService {
  constructor() {
    super();
  }
  addPost = (id,Auth_id,data) => this.post("posts/" +id+"/"+Auth_id, data);
  deletePost = (_id,Auth_id) => this.delete("posts/" + _id+"/"+Auth_id);
  updatePost = (_id, data) => this.put("posts/" + _id);
  getPosts = (id,Auth_id) => this.get("posts/" + id+"/"+Auth_id);
  getSinglePost = (id) => this.get("posts/" + id);
}

let PostsService = new PostService();
export default PostsService