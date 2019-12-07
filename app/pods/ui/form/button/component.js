import { tagName, classNames } from "@ember-decorators/component";
import Component from "@ember/component";
import { attribute } from "@ember-decorators/component";

@tagName("button")
@classNames(
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
)
export default class Button extends Component {
  // @argument(optional(Action))
  click;

  @attribute
  // @argument(optional(oneOf('submit', 'button')))
  type = "button";
}
