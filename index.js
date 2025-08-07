const rows = 20;
const cols = 20;
const gridElement = document.getElementById('grid');

gridElement.style.display = 'grid';
gridElement.style.gridTemplateColumns = `repeat(${cols}, 25px)`;
gridElement.style.gridTemplateRows = `repeat(${rows}, 25px)`;

let grid = [];
let startCell = null;
let endCell = null;

for (let r = 0; r < rows; r++) {
  grid[r] = [];
  for (let c = 0; c < cols; c++) {
    grid[r][c] = 0;
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = r;
    cell.dataset.col = c;
    cell.addEventListener('click', () => handleCellClick(cell));
    gridElement.appendChild(cell);
  }
}

function handleCellClick(cell) {
  const r = parseInt(cell.dataset.row);
  const c = parseInt(cell.dataset.col);
  if (!startCell) {
    startCell = cell;
    cell.classList.add('start');
  } else if (!endCell && cell !== startCell) {
    endCell = cell;
    cell.classList.add('end');
  } else if (cell !== startCell && cell !== endCell) {
    cell.classList.toggle('wall');
    grid[r][c] = cell.classList.contains('wall') ? 1 : 0;
  }
}

function getNeighbors(r, c) {
  const neighbors = [];
  if (r > 0) neighbors.push([r - 1, c]);
  if (r < rows - 1) neighbors.push([r + 1, c]);
  if (c > 0) neighbors.push([r, c - 1]);
  if (c < cols - 1) neighbors.push([r, c + 1]);
  return neighbors;
}

function bfs() {
  const start = [parseInt(startCell.dataset.row), parseInt(startCell.dataset.col)];
  const end = [parseInt(endCell.dataset.row), parseInt(endCell.dataset.col)];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [[...start, []]];
  visited[start[0]][start[1]] = true;
  while (queue.length) {
    const [r, c, path] = queue.shift();
    const newPath = [...path, [r, c]];
    if (r === end[0] && c === end[1]) return newPath;
    for (const [nr, nc] of getNeighbors(r, c)) {
      if (!visited[nr][nc] && grid[nr][nc] === 0) {
        visited[nr][nc] = true;
        queue.push([nr, nc, newPath]);
      }
    }
  }
  return null;
}

function dfs() {
  const start = [parseInt(startCell.dataset.row), parseInt(startCell.dataset.col)];
  const end = [parseInt(endCell.dataset.row), parseInt(endCell.dataset.col)];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const stack = [[...start, []]];
  while (stack.length) {
    const [r, c, path] = stack.pop();
    if (visited[r][c]) continue;
    visited[r][c] = true;
    const newPath = [...path, [r, c]];
    if (r === end[0] && c === end[1]) return newPath;
    for (const [nr, nc] of getNeighbors(r, c)) {
      if (!visited[nr][nc] && grid[nr][nc] === 0) {
        stack.push([nr, nc, newPath]);
      }
    }
  }
  return null;
}

function animatePath(path) {
  let i = 0;
  const interval = setInterval(() => {
    const [r, c] = path[i];
    const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
    if (cell !== startCell && cell !== endCell) {
      cell.classList.add('path');
    }
    i++;
    if (i >= path.length) clearInterval(interval);
  }, 50);
}

function run() {
  if (!startCell || !endCell) {
    alert('Please select start and end points.');
    return;
  }
  document.querySelectorAll('.cell.path').forEach(c => c.classList.remove('path'));
  const algorithm = document.getElementById('algorithm').value;
  const path = algorithm === 'dfs' ? dfs() : bfs();
  if (path) {
    animatePath(path);
  } else {
    alert('No path found.');
  }
}

function reset() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  document.querySelectorAll('.cell').forEach(c => {
    c.className = 'cell';
  });
  startCell = null;
  endCell = null;
}

document.getElementById('run').addEventListener('click', run);
document.getElementById('reset').addEventListener('click', reset);
