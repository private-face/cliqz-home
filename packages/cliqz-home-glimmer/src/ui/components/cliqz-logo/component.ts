import Component, { tracked } from "@glimmer/component";

export default class CliqzNewTab extends Component {
  @tracked('args')
  get style() {
    return this.args.logo.style;
  }
}
