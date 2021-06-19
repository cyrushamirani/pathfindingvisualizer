import './App.css';
import './components/Square'
import Square from './components/Square';
import Grid from './components/Grid'
import Row from './components/Row'
import React, {useState, useEffect} from 'react'
import { get } from 'http';
import gridFunctions from './GridFunctions.js';
import pathAlgorithms from './PathAlgorithms.js'

function App() {
  /**
   * Parameters for the grid dimensions and square size.
   */
  const gridSize = 25
  const sqSize = 25

  /**
   * Creating the matrix representation of the grid.
   */
  const [grid, setGrid] = useState(gridFunctions.newGrid(gridSize, sqSize))
  
  /**
   * Arrays which will store the respective locations of the start and end vertices.
   */
  const [start, setStart] = useState(undefined)
  const [end, setEnd] = useState(undefined)

  console.log(start)
  console.log(end)

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

  const handleExplore = (row, col) => {
	  const newGrid = gridFunctions.getNewGridWithExploreToggled(grid, row, col)
	  setGrid(newGrid)
  }

  const handlePath = (row, col) => {
	const newGrid = gridFunctions.getNewGridWithPathToggled(grid, row, col)
	setGrid(newGrid)
  }

  /**
   * Functions for ui elements, animation
   */
  const clickFuncArr = [handleWallDown, handleStartDown, handleEndDown]
  const [onSquareClick, setOnSquareClick] = useState(0)

  const buttonChooseClick = () => {
      setOnSquareClick((onSquareClick + 1) % clickFuncArr.length)
  }

  const timer = ms => new Promise(res => setTimeout(res, ms))

  async function bfs_explore_action(grid, start, end) {
	  const bfs_explore = pathAlgorithms.bfs_explore(grid, start, end)
	  console.log(bfs_explore)
	  for (var i = 1; i < bfs_explore.length; i++) {
		handleExplore(bfs_explore[i][0], bfs_explore[i][1])
		await timer(5)
	  }
  }



  /**
   * Rendered webapge with button, grid components
   */
  return (
    <div>
		<h1>Welcome to the pathfinding visualizer</h1>
		<button onClick = {buttonChooseClick}>Toggle</button>
		<button onClick = {() => bfs_explore_action(grid, start, end)}>bfs explore</button>
		<Grid tiles = {grid} onSquareClick = {clickFuncArr[onSquareClick]} sqSize = {sqSize}/>
	</div>
  );
}

export default App;
