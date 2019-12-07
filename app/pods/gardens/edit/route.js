import Route from "@ember/routing/route";

export default class GardensEditRoute extends Route {
  model({ slug }) {
    let data = [];
    return { slug, data };
  }
}
