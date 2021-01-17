import GenericService from "./GenericService";
class CandidateService extends GenericService {
  constructor() {
    super();
  }
  addCandidate = (org_id, dep_id, Auth_id,data) => this.post("candidate/" + org_id+"/"+ dep_id+"/"+Auth_id, data);
  deleteCandidate = (_id,Auth_id) => this.delete("candidate/" + _id+"/"+Auth_id);
  updateCandidate = (_id,Auth_id, data) => this.put("candidate/" + _id+"/"+Auth_id, data);
  getCandidates = (org_id, dep_id,Auth_id) => this.get("candidate/" + org_id+"/"+ dep_id+"/"+Auth_id);
  getAllCandidates = (org_id,Auth_id) => this.get("candidate/Organizations/"+ org_id+"/"+Auth_id);
  getResult = (org_id, p_id,Auth_id) => this.get("candidate/post/" + org_id+"/"+ p_id+"/"+Auth_id);
  getSingleCandidate = (id) => this.get("candidate/" + id);
}

let CandidatesService = new CandidateService();
export default CandidatesService