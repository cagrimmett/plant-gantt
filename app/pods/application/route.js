import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import { action } from "@ember/object";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default class ApplicationRoute extends Route.extend(
  ApplicationRouteMixin
) {
  @service session;
  @service firebaseApp;

  @action
  logout() {
    return this.get("session").invalidate();
  }

  @action
  async login() {
    const auth = await this.get("firebaseApp").auth();
    var provider = new firebase.auth.TwitterAuthProvider();
    return auth.signInWithPopup(provider);
  }
}
