import DS from "ember-data";

export default DS.Model.extend({
  garden: DS.belongsTo("garden"),
  startDate: DS.attr("date"),
  name: DS.attr("string"),
  color: DS.attr("string"),
  daysToMaturity: DS.attr("number")
});
