import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggledOn: false,
			base: {
				height: -1,
				width: -1,
				borderRadius: -1
			},
			slider: {
				height: -1,
				width: -1,
				borderRadius: -1
			}
		};
	}

	componentDidMount() {
		const bHeight = this.baseElement.clientHeight;
		const bWidth = this.baseElement.clientHeight;
		const bBorderRadius = this.baseElement.style.borderRadius;
		const sHeight = this.sliderElement.clientHeight;
		const sWidth = this.sliderElement.clientHeight;
		const sBorderRadius = this.sliderElement.style.borderRadius;

		console.log(bHeight, bWidth, bBorderRadius);
		console.log(sHeight, sWidth, sBorderRadius);
		this.setState({ base: { height: bHeight, bWidth: bWidth, borderRadius: bBorderRadius }, slider: { height: sHeight, width: sWidth, borderRadius: sBorderRadius }});
	}

	calculatePadding() {
		const height = this.state.base.height;
		let value = 5;
		if(height < 50) {
			value = height <= 20 ? 2 : Math.trunc(height / 10);
		}
		return value + '%';
	}

	handleClick(event) {
		let toggled = this.state.toggledOn;
		if(event.target.classList.contains('enabled')) {
			event.target.classList.replace('enabled', 'disabled');
			this.setState({ toggledOn: false });
			toggled = !toggled;
		} else {
			event.target.classList.replace('disabled', 'enabled');
			this.setState({ toggledOn: true });
			toggled = !toggled;
		}
		console.log(toggled);
	}

	render() {
		return (
			<div 
				id="base" 
				className="switch" 
				style={{
					backgroundColor: this.state.toggledOn ? 'green' : 'gray',
					padding: this.calculatePadding() }}
				ref={ (divElement) => { this.baseElement = divElement } }>
				<button 
					className="slider disabled" 
					onClick={this.handleClick.bind(this)}
					ref={ (divElement) => { this.sliderElement = divElement } }></button>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Toggle />,
	document.getElementById('root')
);