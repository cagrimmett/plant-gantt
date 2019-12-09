import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  zone: DS.attr("string"),
  plants: DS.hasMany("plant")
});