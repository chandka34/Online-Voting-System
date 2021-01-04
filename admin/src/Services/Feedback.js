import GenericService from "./GenericService";
class feedbackService extends GenericService {
  constructor() {
    super();
  }
  addfeedback = (data) => this.post("feedback", data);
  deletefeedback = (_id) => this.delete("feedback/" + _id);
  updatefeedback = (_id, data) => this.put("feedback/" + _id, data);
  getfeedback = () => this.get("feedback");
  getSinglefeedback = (id) => this.get("feedback/" + id);
}

let feedbacksService = new feedbackService();
export default feedbacksService