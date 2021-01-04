import GenericService from "./GenericService";
class departmentService extends GenericService {
  constructor() {
    super();
  }
  adddepartment = (_id,data) => this.post("department/" +_id, data);
  deletedepartment = (_id) => this.delete("department/" + _id);
  updatedepartment = (_id, data) => this.put("department/" + _id, data);
  getdepartments = (_id) => this.get("department/" +_id);
  getSingleDepartment = (id) => this.get("department/" + id);
}

let DepartmentsService = new departmentService();
export default DepartmentsService