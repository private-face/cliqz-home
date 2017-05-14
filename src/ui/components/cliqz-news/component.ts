import Component, { tracked } from "@glimmer/component";

export default class extends Component {

  @tracked ('args')
  get articles() {
    const model = this.args.model || [];
    return model.slice(0, 3);
  }
}
