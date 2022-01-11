import react from 'react'

const Square = ({row, col, size, color, isWall, click, isStart, isEnd, isPath, isExplored}) => {
	const outlineColor = 'darkblue'
	const squareStyle = {
		width: size,
		height: size,
		background: color,l
		outlineColor: outlineColor,
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	  }
	const wallStyle = {
		width: size,
		height: size,
		background: outlineColor,
		outlineColor: outlineColor,
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const startStyle = {
		width: size,
		height: size,
		background: 'green',
		outlineColor: outlineColor,
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const endStyle = {
		width: size,
		height: size,
		background: 'red',
		outlineColor: outlineColor,
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const pathStyle = {
		width: size,
		height: size,
		background: 'blue',
		outlineColor: outlineColor,
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const exploreStyle = {
		width: size,
		height: size,
		background: 'lightgrey',
		outlineColor: outlineColor,
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	return (
		<div style={isWall ? wallStyle : isStart? startStyle : isEnd? endStyle : isPath? pathStyle : isExplored? exploreStyle : squareStyle}
		 	onClick = {() => click(row, col)}></div>
	);
}

export default Square