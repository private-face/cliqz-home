import React, { Component } from 'react';
import cliqz from './Cliqz';

const SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 91, 224];

class UrlBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      locale: ''
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.getConfig();
    this.textInput.focus();
  }

  componentDidUpdate() {
    window.urlbarReady();
  }

  getConfig() {
    this.props.freshtab.getConfig()
      .then((config) => {
        this.setState(Object.assign({}, this.state, {
          locale: config.locale
        }));
      });
  }

  handleKeyDown(ev) {
    const value = ev.target.value;
    let input = SPECIAL_KEYS.indexOf(ev.which) > -1 ? '' : ev.key;
    this.setState(Object.assign({}, this.state, {
      value: value
    }));
    if(ev.keyCode === 13) {
      input = value;
    }
    cliqz.core.queryCliqz(input);

    cliqz.core.sendTelemetry({
      type: 'home',
      action: 'search_keystroke'
    });

    setTimeout(() => {
      this.textInput.value = '';
    }, 0);
  }

	render() {
		return (
			<div>
				<input className="url-bar" 
               type="text"
               ref={(input) => { this.textInput = input; }}
               placeholder="search"
               onKeyDown={this.handleKeyDown}
               role={this.state.locale} />
			</div>
		);
	}
}

export default UrlBar;