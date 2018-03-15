import React, { Component } from 'react';
import Board from './Board.js'

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{squares: Array(9).fill(null), desp: null},
				],
			step: 0,
			xIsNext: true,
			isMovesOrderReverse: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleMovesOrderReverse = this.handleMovesOrderReverse.bind(this);
	}

	handleClick(id) {
		const {history, step, xIsNext} = this.state;
		const squares = history[step].squares.slice();
		const winner = calculateWinner(squares, xIsNext)

		if (squares[id] || (winner && winner.winnerPlayer)) {
			return;
		}
		// do something
		squares[id] = xIsNext ? 'O' : 'X';

		this.setState({
			history: history.concat({squares: squares}),
			xIsNext: !xIsNext,
			step: history.length,
		});
	}

	handleMovesOrderReverse() {
		const isMovesOrderReverse = this.state.isMovesOrderReverse;
		this.setState({isMovesOrderReverse: !isMovesOrderReverse});
	}

	jumpTo(step) {
		const xIsNext = step % 2 === 0 ? true: false;

		this.setState({
			xIsNext: xIsNext,
			history: this.state.history.slice(0, step + 1),
			step: step,
		});
	}

	render() {
		const {history, step, xIsNext, isMovesOrderReverse} = this.state;
		const squares = history[step].squares;
		const winner = calculateWinner(squares, xIsNext);
		const winnerSquares = winner && winner.winnerSquares;
		let gameInfo = null;

		if (winner && winner.winnerPlayer) {
			gameInfo = `winner is ${winner.winnerPlayer}`;
		}
		else if (step === 9) {
			gameInfo = "Tie game";
		}
		else {
			gameInfo = "Next palyer: ";
			gameInfo += xIsNext ? "O" : "X";
		}
		const currentStep = step;
		const moves = history.map((squares, step) => {
			let desp = null;
			let despMove = getDescription(step, xIsNext);

			if (step === 0) {
				desp = "Go back to start";
			}
			else {
				desp = `Go to step #${step}`;
			}
			const currentMove = step === currentStep ? "strong" : null;

			return (<li key={step}>
								<button className={`desp ${currentMove}`} onClick={() => this.jumpTo(step)}>
									{desp}
								</button>
								<span className={`despMove ${currentMove}`}>{despMove}</span>
							</li>);
		});
		return (
			<div className="game">
				<div>
					<Board 
						squares={squares}
						winnerSquares={winnerSquares} 
						onClick={this.handleClick}
					/>
					<div className="movesOrder">
						<p>Sorting: {isMovesOrderReverse ? "Ascend" : "Descend"}</p>
						<button 
							onClick={this.handleMovesOrderReverse}
						>
							Toggle Sort
						</button>
					</div>
				</div>
				<div className="gameInfo">
					<div>{gameInfo}</div>
					<ol>{!isMovesOrderReverse ? moves:moves.reverse()}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares, xIsNext) {
	let winnerPlayer = null;
	let winnerSquares = [];

	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	lines.some((line) => {
		const [a, b, c] = line;
		if (squares[a] && 
				squares[a] === squares[b] &&
				squares[a] === squares[c]) {
			winnerPlayer = squares[a];
			winnerSquares = winnerSquares.concat(line);
			return;
		}
	});
	return {
		winnerPlayer: winnerPlayer,
		winnerSquares: winnerSquares,
	};
}

function getDescription(step) {
	if (step === 0) {
		return null;
	}
  const sign = step % 2 ? 'O' : 'X';
  const row = Math.floor(step / 3) + 1, 
        col = step % 3 + 1;

  return `put ${sign} on (${col}, ${row})`;
}