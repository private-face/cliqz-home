import Component from '@glimmer/component';

export default class extends Component {
  didUpdate() {
  	if (this.args.type === 'custom') {
  	  window.speeddialsReady();
  	}
}
