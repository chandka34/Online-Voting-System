import GenericService from "./GenericService";
class organizationService extends GenericService {
  constructor() {
    super();
  }
  addorganization = (auth,data) => this.post("organization/"+auth, data);
  deleteorganization = (_id,auth) => this.delete("organization/" + _id+"/"+auth);
  updateorganization = (_id,auth,data) => this.put("organization/" + _id+"/"+auth,data);
  getorganizations = (auth) => this.get("organization/"+auth);
  getSingleOrganization = (id) => this.get("organization/" + id);
}

let OrganizationsService = new organizationService();
export default OrganizationsService