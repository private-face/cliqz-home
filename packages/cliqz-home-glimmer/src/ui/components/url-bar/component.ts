import Component, { tracked } from "@glimmer/component";
import CliqzService from "../cliqz-service";

const SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27,
                      33, 34, 35, 36, 37, 38, 39, 40, 91, 224];

export default class extends Component {

  cliqz: CliqzService = CliqzService.getInstance();

  didInsertElement() {
    this.element.focus();
    window.urlbarReady();
  }

  queryCliqz(ev) {
    let input = SPECIAL_KEYS.indexOf(ev.which) > -1 ? '' : ev.key;

    if (ev.keyCode === 13) {
      input = this.element.value;
    }

    this.cliqz.core.queryCliqz(input);

    this.cliqz.core.sendTelemetry({
      type: 'home',
      action: 'search_keystroke'
    });

    setTimeout(() => {
      this.element.value = '';
    }, 0);
  }
}
