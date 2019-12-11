import Controller from "@ember/controller";
import { computed, action } from "@ember/object";

export default class GardenEditController extends Controller {
  showForm = false;
  showBegin = false;

  @computed("model.plants")
  get showCalendar() {
    if (this.model.plants.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  @computed("model.plants")
  get showBegin() {
    if (this.model.plants.length == 0) {
      this.set("showForm", true);
      return true;
    } else {
      this.set("showForm", false);
      return false;
    }
  }

  @action
  toggle() {
    this.set("showForm", true);
  }
}
