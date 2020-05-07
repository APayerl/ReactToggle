import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

export class ToggleService {
	on;
	listeners;

	constructor(defaultState = false, listeners = []) {
		this.on = defaultState;
		this.listeners = listeners;
	}

	toggleCallback(state) {
		this.on = state;
		this.listeners.forEach(listener => listener(this.on));
	}

	addListener(listener) {
		this.listeners.push(listener);
	}

	removeListener(listener) {
		for(let i = 0; i < this.listeners.length; i++) {
			if(this.listeners[i] === listener) {
				this.listeners.splice(i, 1);
				i--;
			}
		}
	}
}

export default class Toggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listeners: props.helper ? [props.helper.toggleCallback] : props.listeners,
			toggledOn: props.helper ? props.helper.on : props.default,
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
					backgroundColor: this.state.toggledOn ? this.state.base.color.enabled : this.state.base.color.disabled }}
				ref={ (divElement) => { this.baseElement = divElement } }>
				<button 
					className={"slider " + (this.state.toggledOn ? "enabled" : "disabled") }
					style={{
						backgroundColor: this.state.toggledOn ? this.state.slider.color.enabled : this.state.slider.color.disabled,
						borderWidth: this.calculatePadding(),
						borderColor: this.state.toggledOn ? this.state.base.color.enabled : this.state.base.color.disabled
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

let myToggleHelper = new ToggleService(false, [callMeMaybe, callMePerhaps, callMePlease]);

ReactDOM.render(
	<Toggle 
		default={false} 
		listeners={[ 
			callMeMaybe, 
			callMePerhaps, 
			callMePlease ]} 
		baseColorDisabled={"gray"} 
		baseColorEnabled={"green"} 
		sliderColorDisabled={"white"} 
		sliderColorEnabled={"white"}
		helper={myToggleHelper} />,
	document.getElementById('root')
);