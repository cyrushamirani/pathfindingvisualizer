import './App.css';
import './components/Square'
import Square from './components/Square';
import Grid from './components/Grid'
import Row from './components/Row'
import React, {useState, useEffect} from 'react'
import { get } from 'http';
import gridFunctions from './GridFunctions.js';

function App() {
  /**
   * Parameters for the grid dimensions and square size.
   */
  const gridSize = 20
  const sqSize = 35

  const [grid, setGrid] = useState(gridFunctions.newGrid(gridSize, sqSize))
  
  /**
   * Arrays which will store the respective locations of the start and end vertices.
   */
  const [start, setStart] = useState(undefined)
  const [end, setEnd] = useState(undefined)

  //console.log(start)
  //console.log(end)

  /**
   * State changing functions for altering the grid and start/end locations.
   */
  const handleWallDown = (row, col) => {
	  const newGrid = gridFunctions.getNewGridWithWallToggled(grid, row, col)
  	  setGrid(newGrid)
  }

  const handleStartDown = (row, col) => { 
	  const newGrid = gridFunctions.getNewGridWithStartToggled(grid, row, col)
	  if (start !== undefined) {
		newGrid[start[0]][start[1]].isStart = false
	  }
	  setGrid(newGrid)
	  setStart([row, col])
  }

  const handleEndDown = (row, col) => {
	  const newGrid = gridFunctions.getNewGridWithEndToggled(grid, row, col)
	  if (end !== undefined) {
		newGrid[end[0]][end[1]].isEnd = false
	  }
	  setGrid(newGrid)
	  setEnd([row, col])
  }

  //button
  const clickFuncArr = [handleWallDown, handleStartDown, handleEndDown]
  const [onSquareClick, setOnSquareClick] = useState(0)

  const buttonChooseClick = () => {
      setOnSquareClick((onSquareClick + 1) % clickFuncArr.length)
  }

  return (
    <div>
		<h1>Welcome to the pathfinding visualizer</h1>
		<button onClick = {buttonChooseClick}>Toggle</button>
		<Grid tiles = {grid} onSquareClick = {clickFuncArr[onSquareClick]} sqSize = {sqSize}/>
	</div>
  );
}

export default App;
