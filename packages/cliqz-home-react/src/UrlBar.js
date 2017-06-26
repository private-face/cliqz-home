import React, { Component } from 'react';

class UrlBar extends Component {
	render() {
		return (
			<div>
				<input className="url-bar" type="text" placeholder="search" />
			</div>
		);
	}
}

export default UrlBar;