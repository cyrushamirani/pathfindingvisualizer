/**
 * This file contains the path algorithms we will visualize
 * Testing please delete later
 */

/**
 * Returns explored tiles in the order they are explored (does NOT return chosen path)
 * @param {*} grid Grid we wish to search on
 * @param {*} start Starting square (array form)
 * @param {*} end Ending square (array form)
 */
const bfs_explore = (grid, start, end) => {
	const seen = new Set()
	const explored = []
	const queue = [start]
	const prev = new Map()
	const path = []
	while (queue.length > 0) {
		const curr = queue.shift()
		if (curr[0] === end[0] && curr[1] === end[1]) {
			console.log("done")
			var walker = end
			while (parseSquareToString(walker) !== parseSquareToString(start)) {
				path.unshift(walker)
				walker = parseStringToSquare(prev.get(parseSquareToString(walker)))
			}
			return [explored, path]
		}
		if (!seen.has(parseSquareToString(curr))) {
			explored.push(curr)
			seen.add(parseSquareToString(curr))
			const neighbors = getNeighbors(grid, curr, seen)
			for (var i = 0; i < neighbors.length; i++) {
				const neighbor = neighbors[i]
				prev.set(parseSquareToString(neighbor), parseSquareToString(curr))
			}
			queue.push(...neighbors)
		}
	}
}

const dfs_explore = (grid, start, end) => {
	const seen = new Set()
	const explored = []
	const queue = [start]
	const prev = new Map()
	const path = []
	while (queue.length > 0) {
		const curr = queue.pop()
		if (curr[0] === end[0] && curr[1] === end[1]) {
			console.log("done")
			var walker = end
			while (parseSquareToString(walker) !== parseSquareToString(start)) {
				path.unshift(walker)
				walker = parseStringToSquare(prev.get(parseSquareToString(walker)))
			}
			return [explored, path]
		}
		if (!seen.has(parseSquareToString(curr))) {
			explored.push(curr)
			seen.add(parseSquareToString(curr))
			const neighbors = getNeighbors(grid, curr, seen)
			for (var i = 0; i < neighbors.length; i++) {
				const neighbor = neighbors[i]
				prev.set(parseSquareToString(neighbor), parseSquareToString(curr))
			}
			queue.push(...neighbors)
		}
	}
}

/**
 * Returns the path from start to end found by the algorithm
 * @param {*} grid Grid we wish to search on
 * @param {*} start Starting square (array form)
 * @param {*} end Ending square (array form)
 */

const bfs_path = (grid, start, end) => {
	const seen = new Set()
	const queue = [start]
	const prev = new Map()
	const path = []
	while (queue.length > 0) {
		const curr = queue.shift()
		if (curr[0] === end[0] && curr[1] === end[1]) {
			console.log("done")
			var walker = end
			while (parseSquareToString(walker) !== parseSquareToString(start)) {
				path.unshift(walker)
				walker = parseStringToSquare(prev.get(parseSquareToString(walker)))
			}
			return path
		}
		if (!seen.has(parseSquareToString(curr))) {
			seen.add(parseSquareToString(curr))
			const neighbors = getNeighbors(grid, curr, seen)
			for (var i = 0; i < neighbors.length; i++) {
				const neighbor = neighbors[i]
				prev.set(parseSquareToString(neighbor), parseSquareToString(curr))
			}
			queue.push(...neighbors)
		}
	}
}


/**
 * Helper function to retrieve valid neighbors of given square.
 * Used in DFS/BFS.
 */

const getNeighbors = (grid, square, seen) => {
	const candidates = [[square[0] + 1, square[1]], [square[0] - 1, square[1]],
	[square[0], square[1] + 1], [square[0], square[1] - 1]]

	const prunedLoc = candidates.filter(square => (square[0] >= 0 && square[0] < grid.length) 
		&& (square[1] >= 0 && square[1] < grid.length))

	const prunedWall = prunedLoc.filter(square => !grid[square[0]][square[1]].isWall)

	const final = prunedWall.filter(square => !seen.has(`${square[0]}-${square[1]}`))

	return final
}

const parseStringToSquare = (str) => {
	const squareArr = str.split('-')
	return squareArr.map(str => parseInt(str))
}

const parseSquareToString = (square) => {
	return `${square[0]}-${square[1]}`
}

export default {bfs_explore, dfs_explore}
