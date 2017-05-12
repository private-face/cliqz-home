import Component, { tracked } from "@glimmer/component";
import CliqzService from "../cliqz-service";

export default class CliqzNewTab extends Component {
  cliqz: CliqzService = new CliqzService();

  @tracked locale: String;
  @tracked dials;
  @tracked news;

  didInsertElement() {
    this.cliqz.freshtab.getConfig().then(config => {
      this.locale = config.locale;
    });
    this.cliqz.freshtab.getSpeedDials().then(dials => {
      this.dials = dials;
    });
    this.cliqz.freshtab.getNews().then(news => {
      this.news = news.news;
    });
  }
}
