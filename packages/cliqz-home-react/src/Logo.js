import React, { Component } from 'react';

class Logo extends Component {
	render() {
		return (
			<span className="logo" 
		    style={{color: this.props.logo.color, backgroundImage: this.props.logo.backgroundImage, backgroundColor: '#' + this.props.logo.backgroundColor}}>
		    {this.props.logo.text}
			</span>
		)
	}
}

export default Logo;