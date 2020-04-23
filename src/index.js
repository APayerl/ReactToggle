import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listeners: props.listeners,
			toggledOn: props.default,
			base: {
				color: {
					enabled: props.baseColorEnabled ? props.baseColorEnabled : "green",
					disabled: props.baseColorDisabled ? props.baseColorDisabled : "gray"
				},
				height: -1,
				width: -1,
				borderRadius: -1
			},
			slider: {
				color: {
					enabled: props.sliderColorEnabled ? props.sliderColorEnabled : "white",
					disabled: props.sliderColorDisabled ? props.sliderColorDisabled : "white"
				},
				height: -1,
				width: -1,
				borderRadius: -1
			}
		};
	}

	componentDidMount() {
		const base = this.state.base;
		base.height = this.baseElement.clientHeight;
		base.width = this.baseElement.clientHeight;
		base.borderRadius = this.baseElement.style.borderRadius;
		const slider = this.state.slider;
		slider.height = this.sliderElement.clientHeight;
		slider.width = this.sliderElement.clientHeight;
		slider.borderRadius = this.sliderElement.style.borderRadius;

		this.setState({ base: base, slider: slider});
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
		if(this.state.listeners) {
			this.state.listeners.forEach(listener => listener(!this.state.toggledOn));
		}
		this.setState({ toggledOn: !this.state.toggledOn });
	}

	render() {
		return (
			<div 
				id="base" 
				className="switch" 
				style={{
					backgroundColor: this.state.toggledOn ? this.state.base.color.enabled : this.state.base.color.disabled,
					padding: this.calculatePadding() }}
				ref={ (divElement) => { this.baseElement = divElement } }>
				<button 
					className={"slider " + (this.state.toggledOn ? "enabled" : "disabled") }
					style={{
						backgroundColor: this.state.toggledOn ? this.state.slider.color.enabled : this.state.slider.color.disabled
					}}
					onClick={this.handleClick.bind(this)}
					ref={ (divElement) => { this.sliderElement = divElement } }></button>
			</div>
		);
	}
}

// ========================================

function callMeMaybe(result) {
	console.log("callMeMaybe", result);
}

function callMePerhaps(result) {
	console.log("callMePerhaps", result);
}

function callMePlease(result) {
	console.log("callMePlease", result);
}

ReactDOM.render(
	<Toggle 
		default={false} 
		listeners={[ 
			callMeMaybe, 
			callMePerhaps, 
			callMePlease ]} 
		baseColorDisabled={"red"} 
		baseColorEnabled={"green"} 
		sliderColorDisabled={"orange"} 
		sliderColorEnabled={"yellow"} />,
	document.getElementById('root')
);