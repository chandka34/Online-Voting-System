import GenericService from "./GenericService";
class CandidateService extends GenericService {
  constructor() {
    super();
  }
  addCandidate = (org_id, dep_id, data) => this.post("candidate/" + org_id+"/"+ dep_id, data,{Headers:{
    'Content-Type':'multipart/form-data'
}});
  deleteCandidate = (_id) => this.delete("candidate/" + _id);
  updateCandidate = (_id, data) => this.put("candidate/" + _id, data);
  getCandidates = (org_id, dep_id) => this.get("candidate/" + org_id+"/"+ dep_id);
  getAllCandidates = (org_id) => this.get("candidate/Organizations/"+ org_id);
  getResult = (org_id, p_id) => this.get("candidate/post/" + org_id+"/"+ p_id);
  getSingleCandidate = (id) => this.get("candidate/" + id);
}

let CandidatesService = new CandidateService();
export default CandidatesService