import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import slugify from "ember-slugify";

export default class AddPlantFormComponent extends Component {
  @service store;
  @service router;
  name;
  zone;

  @action
  saveGarden() {
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

    let slug = slugify(this.name);

    let newGarden = this.store.createRecord("garden", {
      name: this.name,
      zone: this.zone,
      slug: slug
    });

    newGarden.save().then(this.router.transitionTo("gardens.edit", newGarden));
    //    this.router.transitionTo("gardens.edit", slug);
  }
}
