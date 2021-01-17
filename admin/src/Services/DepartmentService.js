import GenericService from "./GenericService";
class departmentService extends GenericService {
  constructor() {
    super();
  }
  adddepartment = (_id,Auth_id,data) => this.post("department/" +_id+"/"+Auth_id,data);
  deletedepartment = (_id,Auth_id) => this.delete("department/" + _id+"/"+Auth_id);
  updatedepartment = (_id,Auth_id,data) => this.put("department/" + _id+"/"+Auth_id, data);
  getdepartments = (_id,Auth_id) => this.get("department/" +_id+"/"+Auth_id);
  getSingleDepartment = (id) => this.get("department/" + id);
}

let DepartmentsService = new departmentService();
export default DepartmentsService