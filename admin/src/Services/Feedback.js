import GenericService from "./GenericService";
class feedbackService extends GenericService {
  constructor() {
    super();
  }
  addfeedback = (id,data) => this.post("feedback/",+"/"+id,data);
  deletefeedback = (_id,id) => this.delete("feedback/" + _id+"/"+id);
  updatefeedback = (_id, data) => this.put("feedback/" + _id, data);
  getfeedback = (id) => this.get("feedback/"+id);
  getSinglefeedback = (id) => this.get("feedback/" + id);
}

let feedbacksService = new feedbackService();
export default feedbacksService