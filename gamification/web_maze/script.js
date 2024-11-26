document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const mazeContainer = document.getElementById('maze-container');

    let maze = [
        ['S', '0', '1', '1', 'E'],
        ['1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '1'],
        ['1', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1']
    ];

    renderMaze();

    function renderMaze() {
        mazeContainer.innerHTML = ''; // Clear previous maze

        maze.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                if (cell === 'S') cellDiv.classList.add('start');
                if (cell === 'E') cellDiv.classList.add('end');
                cellDiv.textContent = cell;
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.column = columnIndex;
                mazeContainer.appendChild(cellDiv);
            });
        });
    }

    window.solveMaze = (algorithm) => {
        console.log("solveMaze called with algorithm:", algorithm);
        const start = findCell('S');
        const end = findCell('E');
        let path;

        if (algorithm === 'BFS') {
            path = bfs(maze, start, end);
        } else if (algorithm === 'DFS') {
            path = dfs(maze, start, end);
        }

        if (path) {
            path.forEach(({ x, y }) => {
                const cellDiv = mazeContainer.querySelector(`[data-row="${x}"][data-column="${y}"]`);
                cellDiv.classList.add('path');
            });
        }
    };

    function findCell(type) {
        for (let x = 0; x < maze.length; x++) {
            for (let y = 0; y < maze[0].length; y++) {
                if (maze[x][y] === type) return { x, y };
            }
        }
        return null;
    }

    function bfs(maze, start, end) {
        console.log("BFS algorithm started");
        const queue = [start];
        const visited = new Set();
        const parentMap = new Map();

        visited.add(`${start.x},${start.y}`);

        while (queue.length > 0) {
            const { x, y } = queue.shift();
            if (x === end.x && y === end.y) return reconstructPath(parentMap, start, end);

            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const newX = x + dx;
                const newY = y + dy;

                if (isValidMove(maze, newX, newY, visited)) {
                    visited.add(`${newX},${newY}`);
                    parentMap.set(`${newX},${newY}`, { x, y });
                    queue.push({ x: newX, y: newY });
                }
            }
        }
        return null;
    }

    function dfs(maze, start, end) {
        console.log("DFS algorithm started");
        const stack = [start];
        const visited = new Set();
        const parentMap = new Map();

        visited.add(`${start.x},${start.y}`);

        while (stack.length > 0) {
            const { x, y } = stack.pop();
            if (x === end.x && y === end.y) return reconstructPath(parentMap, start, end);

            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const newX = x + dx;
                const newY = y + dy;

                if (isValidMove(maze, newX, newY, visited)) {
                    visited.add(`${newX},${newY}`);
                    parentMap.set(`${newX},${newY}`, { x, y });
                    stack.push({ x: newX, y: newY });
                }
            }
        }
        return null;
    }

    function isValidMove(maze, x, y, visited) {
        return x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] !== '1' && !visited.has(`${x},${y}`);
    }

    function reconstructPath(parentMap, start, end) {
        const path = [];
        let current = end;

        while (current && (current.x !== start.x || current.y !== start.y)) {
            path.push(current);
            current = parentMap.get(`${current.x},${current.y}`);
        }
        path.push(start);
        return path.reverse();
    }

    function generateRandomMaze() {
        const newMaze = maze.map(row => row.map(cell => Math.random() > 0.7 ? '1' : '0'));
        newMaze[0][0] = 'S';
        newMaze[0][4] = 'E';
        maze = newMaze;
        renderMaze();
    }
});
const mazeContainer = document.getElementById('maze-container');

function change(){
    mazeContainer.style.backgroundColor="red";
}
