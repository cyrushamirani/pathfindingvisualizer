import './App.css';
import './components/Square'
import Square from './components/Square';
import Grid from './components/Grid'
import Row from './components/Row'
import React, {useState, useEffect} from 'react'
import { get } from 'http';
import gridFunctions from './GridFunctions.js';
import pathAlgorithms from './PathAlgorithms.js'
import PathAlgorithms from './PathAlgorithms.js';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function App() {
  /**
   * Parameters for the grid dimensions and square size.
   */
  const gridSize = 25
  const gridHeight = 25
  const sqSize = 25

  /**
   * Creating the matrix representation of the grid.
   */
  const [grid, setGrid] = useState(gridFunctions.newGrid(gridSize, gridHeight,sqSize))
  
  /**
   * Arrays which will store the respective locations of the start and end vertices.
   */
  const [start, setStart] = useState(undefined)
  const [end, setEnd] = useState(undefined)

  console.log("start:", start)
  console.log("end:", end)
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

  const handleClear = () => {
	  const newGrid = gridFunctions.getNewClearGrid(grid)
	  setGrid(newGrid)
	  setVisualized(undefined)
  }

  const handleReset = () => {
	  const newGrid = gridFunctions.getNewResetGrid(grid)
	  setGrid(newGrid)
	  setStart(undefined)
	  setEnd(undefined)
	  setVisualized(undefined)
  }

  /**
   * Functions / state elements for UI.
   */
  const clickFuncArr = [handleWallDown, handleStartDown, handleEndDown]
  const [onSquareClick, setOnSquareClick] = useState(0)

  const [visualized, setVisualized] = useState(undefined)

  const buttonChooseClick = () => {
      setOnSquareClick((onSquareClick + 1) % clickFuncArr.length)
  }

  const setVisualizedTo = (search) => {
	  if (start && end) {
		setVisualized(search)
	  }
  }

  /**
   * Functions / state elements for animation of paths
   */

  async function explore_action (grid, start, end, algo) {
	if (start === undefined || end === undefined){
		return;
	}
	const [explore, path] = algo(grid, start, end)
	console.log("explore", explore)
	console.log("path", path)
	await animateExplore(explore)
	await animatePath(path)
  }

  async function animateExplore(exploreList) {
	const timer = ms => new Promise(res => setTimeout(res, ms))
	for (var i = 1; i < exploreList.length; i++) {
		handleExplore(exploreList[i][0], exploreList[i][1])
		await timer(5)
	}
  }

  async function animatePath(pathList) {
	const timer = ms => new Promise(res => setTimeout(res, ms))
	for (var i = 0; i < pathList.length - 1; i++) {
		handlePath(pathList[i][0], pathList[i][1])
		await timer(3)
	}
  }

  async function bfs_explore_action(grid, start, end) {
	if (!visualized) {
		explore_action(grid, start, end, PathAlgorithms.bfs_explore)
		setVisualizedTo('bfs')
  	}
  }

  async function dfs_explore_action(grid, start, end) {
	if (!visualized) {
		explore_action(grid, start, end, PathAlgorithms.dfs_explore)
		setVisualizedTo('dfs')
	}
  }

  /**
   * Rendered webapge with button, grid components
   */
  return (
    <div>
		<h1>Pathfinding Algorithm Visualizer</h1>
		<div>
			<Alert variant="warning">Welcome to the pathfinding visualizer! Press "Toggle" to cycle between placing walls, start point, and endpoint. Clear or reset the board after exploring to explore again.</Alert>
		</div>
		<div>
			<Button variant="primary" onClick = {buttonChooseClick}>Toggle</Button>{' '}

			<Button variant={visualized === undefined ? "primary" : visualized !== 'bfs' ? "danger" : "success"}
				 onClick = {() => bfs_explore_action(grid, start, end)}>bfs explore</Button>{' '}
			<Button variant={visualized === undefined ? "primary" : visualized !== 'dfs' ? "danger" : "success"}
				 onClick = {() => dfs_explore_action(grid, start, end)}>dfs explore</Button>{' '}

			<Button variant="primary" onClick = {() => handleClear(grid)}>clear path</Button>{' '}
			<Button variant="primary" onClick = {() => handleReset(grid)}>reset board</Button>
		</div>
		<div>
			&nbsp;
		</div>
		<div>
			<Grid tiles = {grid} onSquareClick = {clickFuncArr[onSquareClick]} sqSize = {sqSize}/>
		</div>
	</div>
  );
}

export default App;
