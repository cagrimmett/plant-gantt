import Route from "@ember/routing/route";

export default class GardensEditRoute extends Route {
  model({ id }) {
    return this.store.findRecord("garden", id, { include: "plants" });
  }
}
