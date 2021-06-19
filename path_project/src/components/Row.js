import react from 'react'
import Square from './Square'

const Row = ({rowList, sqSize, onSquareClick}) => {
	const rowStyle = {
		height: sqSize
	}
	return(
		<div style={rowStyle}>
			{rowList.map(sq => <Square size={sq.size} color={sq.color} isWall = {sq.isWall}
			 row = {sq.row} col = {sq.col} click = {onSquareClick} isStart = {sq.isStart}
			  isEnd = {sq.isEnd} isPath = {sq.isPath} isExplored = {sq.isExplored}></Square>)}
		</div>
	)
}

export default Row