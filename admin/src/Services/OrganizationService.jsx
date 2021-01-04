import GenericService from "./GenericService";
class organizationService extends GenericService {
  constructor() {
    super();
  }
  addorganization = (data) => this.post("organization", data);
  deleteorganization = (_id) => this.delete("organization/" + _id);
  updateorganization = (_id, data) => this.put("organization/" + _id, data);
  getorganizations = () => this.get("organization");
  getSingleOrganization = (id) => this.get("organization/" + id);
}

let OrganizationsService = new organizationService();
export default OrganizationsService