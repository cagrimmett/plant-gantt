import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class AddPlantFormComponent extends Component {
  @service Store;

  startDate;
  name;
  color;
  daysToMaturity;

  @action
  addToChart() {
    // let object = {
    //   start: this.startDate,
    //   daysToMaturity: Number(this.daysToMaturity),
    //   name: this.name,
    //   color: this.color.toHEXA().toString()
    // };
    // this.data.push(object);
    // this.set("startDate", null);
    // this.set("name", null);
    // this.set("color", null);
    // this.set("daysToMaturity", null);

    Store.createRecord("plant", {
      start: this.startDate,
      daysToMaturity: Number(this.daysToMaturity),
      name: this.name,
      color: this.color.toHEXA().toString()
    });
  }
}
