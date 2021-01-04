import GenericService from "./GenericService";
class ElectionService extends GenericService {
  constructor() {
    super();
  }
  addElection = (data) => this.post("Election", data);
  deleteElection = (_id) => this.delete("Election/" + _id);
  updateElection = (_id, data) => this.put("Election/" + _id, data);
  getElections = () => this.get("Election");
  getSingleElection = (id) => this.get("Election/" + id);
}

let ElectionsService = new ElectionService();
export default ElectionsService