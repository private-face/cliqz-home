import React, { Component } from 'react';
import Logo from './Logo';

class SpeedDials extends Component {
	componentDidUpdate() {
		if (this.props.dials.custom.length || this.props.dials.history.length) {
			window.speeddialsReady();
		}
	}

	render() {
		return (
			<div>
				<h3 className="speedDialLabel">Most visited</h3>
				<div className="speed-dial-row" id="most-visited">
					{
						this.props.dials.history.slice(0,5).map(function(dial, i) {

							return <a href={dial.url} key={i} className="speed-dial">
									<Logo logo={dial.logo} />
									<span className="title">{dial.displayTitle}</span>
								</a>
						})
					}
				</div>

				<h3 className="speedDialLabel">Favorites</h3>
				<div className="speed-dial-row" id="most-favorites">
					
						{
							this.props.dials.custom.slice(0,5).map(function(dial, i) {
								return <a className="speed-dial" key={i}>
									<span className="logo" style={{color: dial.logo.color, backgroundImage: dial.logo.backgroundImage, backgroundColor: '#' + dial.logo.backgroundColor}}>{dial.logo.text}</span>
									<span className="title">{dial.displayTitle}</span>
								</a>
							})	
						}
				
				</div>
			</div>
		);
	}
}

export default SpeedDials;