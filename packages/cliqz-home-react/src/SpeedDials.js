import React, { Component } from 'react';
import Logo from './Logo';

class SpeedDials extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dials: {
				history: [],
				custom: []
			}
		}
	}

	componentDidMount() {
		this.loadSpeedDials();
	}

	loadSpeedDials() {
		this.props.freshtab.getSpeedDials().then(dials => {
	        
	    this.setState({
				dials: dials
			});
     }).catch(console.error);
	}

	render() {
		return (
			<div>
				<h3 className="speedDialLabel">Most visited</h3>
				<div className="speed-dial-row" id="most-visited">
					{
						this.state.dials.history.slice(0,5).map(function(dial) {

							return <a href={dial.url} className="speed-dial">
									<Logo logo = {dial.logo} />
									<span className="title">{dial.displayTitle}</span>
								</a>
						})
					}
				</div>

				<h3 className="speedDialLabel">Favorites</h3>
				<div className="speed-dial-row" id="most-favorites">
					
						{
							this.state.dials.custom.slice(0,5).map(function(dial) {
								return <a className="speed-dial">
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