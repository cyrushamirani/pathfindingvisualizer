const newGrid = (gridSize, sqSize) => {  
  const initialGrid = new Array(gridSize)
  for (var i = 0; i < gridSize; i++) initialGrid[i] = [];
  for (var i = 0; i < gridSize; i++){
	for (var j = 0; j < gridSize; j++) {
		const newSquare = {size: sqSize, color: '#eaae59', isWall: false, isStart: false, isEnd: false, isPath: false, row: i, col: j}
		initialGrid[i] = initialGrid[i].concat(newSquare)
	}
  }  
  return initialGrid
}


const getNewGridWithWallToggled = (grid, row, col) => {
	const newGrid = grid.slice()
	const oldSquare = grid[row][col]
	const newSquare = {
		...oldSquare,
		isEnd: false,
		isPath: false,
		isStart: false,
		isWall: !oldSquare.isWall
	}
	newGrid[row][col] = newSquare
	return newGrid
 }

const getNewGridWithStartToggled = (grid, row, col) => {
   const newGrid = grid.slice()
   const oldSquare = grid[row][col]
   const newSquare = {
	   ...oldSquare,
	   isEnd: false,
	   isPath: false,
	   isWall: false,
	   isStart: !oldSquare.isStart
   }
   newGrid[row][col] = newSquare
   return newGrid
}

const getNewGridWithEndToggled = (grid, row, col) => {
   const newGrid = grid.slice()
   const oldSquare = grid[row][col]
   const newSquare = {
	   ...oldSquare,
	   isStart: false,
	   isWall: false,
	   isPath: false,
	   isEnd: !oldSquare.isEnd
   }
   newGrid[row][col] = newSquare
   return newGrid
}

const getNewGridWithPathToggled = (grid, row, col) => {
	 const newGrid = grid.slice()
	 const oldSquare = grid[row][col]
	 const newSquare = {
		 ...oldSquare,
		 isStart: false,
		 isWall: false,
		 isEnd: false,
		   isPath: !oldSquare.isPath
	 }
	 newGrid[row][col] = newSquare
	   return newGrid
 }

export default {getNewGridWithEndToggled, getNewGridWithPathToggled, getNewGridWithStartToggled,
	 getNewGridWithWallToggled, newGrid}
