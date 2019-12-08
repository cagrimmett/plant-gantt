import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default class GardenEditController extends Controller {
  showForm = false;
  showBegin = false;

  @computed("model")
  get dataLength() {
    return this.model.data.length;
  }

  @computed("model.data")
  get showBegin() {
    if (this.model.data.length == 0) {
      this.set("showForm", true);
      return true;
    } else {
      this.set("showForm", false);
      return false;
    }
  }
}
