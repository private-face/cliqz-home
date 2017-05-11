import Component, { tracked } from "@glimmer/component";
import CliqzService from "../cliqz-service";

export default class CliqzNewTab extends Component {
  cliqz: CliqzService = new CliqzService();

  @tracked locale: String;

  didInsertElement() {
    this.cliqz.freshtab.getConfig().then(config => {
      this.locale = config.locale;
    });
  }
}
