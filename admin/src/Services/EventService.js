import GenericService from "./GenericService";
class EventService extends GenericService {
  constructor() {
    super();
  }
  addEvent = (auth,data) => this.post("Event/"+auth,data);
  deleteEvent = (_id,auth) => this.delete("Event/" + _id,+"/"+auth);
  updateEvent = (_id,auth,data) => this.put("Event/" + _id+"/"+auth, data);
  getEvent = (id) => this.get("Event/"+id);
  getSingleEvent = (id) => this.get("Event/" + id);
}

let EventsService = new EventService();
export default EventsService