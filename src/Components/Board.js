import React, { Component } from 'react';
import Square from './Square.js'

export default class Board extends Component {
	render() {
		const {squares, winnerSquares} = this.props;
		const rows = Array(3).fill(null);
		const cells = rows;
		const Squares = rows.map((row, i) => {
			const cellsWrap = cells.map((cell, j) => {
				const index = i * 3 + j;
				let winClass = null;
				if (winnerSquares.includes(index)) {
					winClass = "winClass";
				}
				return (<Square
									winClass={winClass}
									key={index} 
									id={index} 
									value={squares[index]}
									onClick={this.props.onClick}
								/>);
								
								
			});
			const rowsWrap = <div key={i} className="squareRow">{cellsWrap}</div>;
			return rowsWrap;
		});
		return (
			<div>{Squares}</div>
		);
	}
}