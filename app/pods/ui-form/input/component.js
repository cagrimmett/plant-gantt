import TextField from "@ember/component/text-field";
import { classNames } from "@ember-decorators/component";

@classNames(
  "bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 my-2 px-4 block w-full appearance-none leading-normal"
)
export default class Input extends TextField {}
