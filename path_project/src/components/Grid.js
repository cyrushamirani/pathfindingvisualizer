import react from 'react'
import Row from './Row'

const Grid = ({tiles, sqSize, onSquareClick}) => {
	const gridStyle = {
		textAlign: 'center'
	}
	return (
		<div style = {gridStyle}>
			{tiles.map(row => <Row rowList={row} sqSize={sqSize} onSquareClick = {onSquareClick}> </Row>)}
		</div>
	)
}

export default Grid