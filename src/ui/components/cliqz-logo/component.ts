import Component, { tracked } from "@glimmer/component";

export default class CliqzNewTab extends Component {
  get style() {
    return this.args.logo.style;
  }
}
