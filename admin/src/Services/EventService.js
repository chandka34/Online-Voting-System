import GenericService from "./GenericService";
class EventService extends GenericService {
  constructor() {
    super();
  }
  addEvent = (data) => this.post("Event", data);
  deleteEvent = (_id) => this.delete("Event/" + _id);
  updateEvent = (_id, data) => this.put("Event/" + _id, data);
  getEvent = () => this.get("Event");
  getSingleEvent = (id) => this.get("Event/" + id);
}

let EventsService = new EventService();
export default EventsService