import React, { Component } from 'react';
import cliqz from './Cliqz';

const SPECIAL_KEYS = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 91, 224];

class UrlBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.textInput.focus();
  }

  handleKeyDown(ev) {
    const value = ev.target.value;
    let input = SPECIAL_KEYS.indexOf(ev.which) > -1 ? '' : ev.key;
    this.setState({
      value: value
    });
    if(ev.keyCode === 13) {
      input = value;
    }
    console.log(this.textInput)
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
               onKeyDown={this.handleKeyDown} />
			</div>
		);
	}
}

export default UrlBar;