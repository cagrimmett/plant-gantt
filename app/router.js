import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("login");
  this.route("signup");
  this.route("gardens", function() {
    this.route("new");
    this.route("edit", { path: ":slug" });
  });
  this.route("public", { path: ":user_slug" }, function() {
    this.route("garden", { path: ":garden_slug" });
  });
});

export default Router;
