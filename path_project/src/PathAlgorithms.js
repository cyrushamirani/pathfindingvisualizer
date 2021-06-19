/**
 * This file contains the path algorithms we will visualize
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
	while (queue.length > 0) {
		const curr = queue.shift()
		if (curr[0] === end[0] && curr[1] === end[1]) {
			console.log("done")
			return explored
		}
		if (!seen.has(`${curr[0]}-${curr[1]}`)) {
			explored.push(curr)
			seen.add(`${curr[0]}-${curr[1]}`)
			const neighbors = getNeighbors(grid, curr, seen)
			queue.push(...neighbors)
		}
	}
	return explored
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
	while (queue.length > 0) {
		const curr = queue.shift()
		if (start[1] = end[1] && start[1] === end[1]) {
			const retArray = []

		}

		if (!seen.has(`${curr[0]}-${curr[1]}`)) {
			seen.add(`${curr[0]}-${curr[1]}`)
			const neighbors = getNeighbors(grid, curr)
			for (var i = 0; i < neighbors.length; i++) {
				//prev.set(`${neighbors[i][0]}-${neighbors[i][1]}`, `${curr[0]}-${curr[1]}`)
				prev.set(neighbors[i], curr)
			}
			queue.push(neighbors)
		}
	}
}


/**
 * Helper function to retrieve valid neighbors of given square.
 * 
 */

const getNeighbors = (grid, square, seen) => {
	const candidates = [ [square[0] + 1, square[1]], [square[0] - 1, square[1]],
	 [square[0], square[1] + 1], [square[0], square[1] - 1]]

	const prunedLoc = candidates.filter(square => (square[0] >= 0 && square[0] < grid.length) 
		&& (square[1] >= 0 && square[1] < grid.length))

	const prunedWall = prunedLoc.filter(square => !grid[square[0]][square[1]].isWall)

	const final = prunedWall.filter(square => !seen.has(`${square[0]}-${square[1]}`))

	return final
}

export default {bfs_explore}
