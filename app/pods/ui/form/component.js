import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";

@tagName("form")
export default class Form extends Component {
  onSubmit() {}

  submit(event) {
    event.preventDefault();
    this.get("onSubmit")();
  }
}
