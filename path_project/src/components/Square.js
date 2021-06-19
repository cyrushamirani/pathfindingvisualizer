import react from 'react'

const Square = ({row, col, size, color, isWall, click, isStart, isEnd, isPath, isExplored}) => {
	const squareStyle = {
		width: size,
		height: size,
		background: color,
		outlineColor: 'darkblue',
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	  }
	const wallStyle = {
		width: size,
		height: size,
		background: 'darkblue',
		outlineColor: 'darkblue',
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const startStyle = {
		width: size,
		height: size,
		background: 'green',
		outlineColor: 'darkblue',
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const endStyle = {
		width: size,
		height: size,
		background: 'red',
		outlineColor: 'darkblue',
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const pathStyle = {
		width: size,
		height: size,
		background: 'lightblue',
		outlineColor: 'darkblue',
		outlineStyle: "solid",
		outlineWidth: "1",
		display: 'inline-block'
	}

	const exploreStyle = {
		width: size,
		height: size,
		background: 'lightgrey',
		outlineColor: 'darkblue',
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