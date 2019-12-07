import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default class GardenEditController extends Controller {
  showForm = false;
  showBegin = false;

  @computed("model")
  get dataLength() {
    return this.model.data.length;
  }

  @computed("model")
  get show() {
    if (this.model.data.length == 0) {
      this.set("showBegin", true);
      this.set("showForm", true);
    } else if (this.model.data.length > 0) {
      //drawChart();
    }
  }
}
