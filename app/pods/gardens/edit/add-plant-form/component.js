import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class AddPlantFormComponent extends Component {
  @service store;

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

    let newPlant = this.store.createRecord("plant", {
      startDate: new Date(this.startDate),
      daysToMaturity: Number(this.daysToMaturity),
      name: this.name,
      color: this.color.toHEXA().toString(),
      garden: this.store.peekRecord("garden", this.garden)
    });

    newPlant.save();
  }
}
