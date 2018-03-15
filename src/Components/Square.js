import React, { Component } from 'react';

export default class Square extends Component {
	render() {
		const {id, value, winClass} = this.props;
		return (
			<button className={`square ${winClass}`} onClick={() => this.props.onClick(id)} >{value}</button>
		);
	}
}