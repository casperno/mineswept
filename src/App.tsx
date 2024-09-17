import { useState } from "react";
import { Board } from "./Board";

export type cellState = {
  open: boolean;
  mine: boolean;
  count: number;
  flagged: boolean;
  highlighted: boolean;
  index: number;
  row: number;
  col: number;
};

const cols = 15;
const rows = 15;
const factor = 0.1; // difficulty as percent of cells that are mines
let isFirstClick = true;

export default function Game() {
  let initial: cellState[] = [];
  for (let i = 0; i < rows * cols; i++) {
    initial.push({
      index: i,
      open: false,
      mine: false,
      count: 0,
      flagged: false,
      highlighted: false,
      row: Math.floor(i / cols),
      col: i % cols,
    });
  }
  const [state, setState] = useState<cellState[]>(initial);

  let numMines = 10;

  function handleClick(i: number, context: boolean) {
    let nextstate = state.slice();

    if (isFirstClick) {
      isFirstClick = false;
      nextstate = initMineField(nextstate, i);
    }

    if (context) {
      nextstate[i].flagged = !nextstate[i].flagged;
    } else {
      // open cell
      const isMine = setAsOpen(nextstate[i], nextstate);
      if (isMine) {
        nextstate.forEach((s) => (s.open = true));
        alert("You bombed out!");
        // this.initGame();
      } else {
        // count how many closed cells are left.
        // If closed cells = number of mins => victory!
        const numClosedCells = state.reduce(
          (count, cell) => count + (cell.open ? 0 : 1),
          0
        );
        if (numMines === numClosedCells) {
          alert("Congrats, you won!");
        }
      }
    }

    setState(nextstate);
  }

  return (
    <>
      <h1>Mineswept, the game</h1>
      <Board cols={cols} rows={rows} state={state} handleClick={handleClick} />
      {/*  <div id="output">
        <div id="log"></div>
        <button id="next">Next</button>
      </div> */}
    </>
  );
}

function initMineField(state: cellState[], clickedIndex: number) {
  let numMines = Math.floor(cols * rows * factor);

  const clickedCell = state[clickedIndex];

  const newState = state.slice();

  let max = 1000;

  while (numMines > 0 && max--) {
    const col = getRandomInt(cols);
    const row = getRandomInt(rows);

    // check that mine is not placed on or next to initial click
    if (
      col >= clickedCell.col - 1 &&
      col <= clickedCell.col + 1 &&
      row >= clickedCell.row - 1 &&
      row <= clickedCell.row + 1
    ) {
      continue;
    }
    const cell = state[col + row * cols];
    if (!cell.mine) {
      cell.mine = true;
      numMines--;
    }
  }

  // calculate number of surrounding mines for each cell
  newState.forEach(
    (cell, index) => (cell.count = countSurroundingMines(cell, state))
  );

  return newState;
}

function setAsOpen(cell: cellState, state: cellState[]): boolean {
  if (cell.mine) return true;
  if (cell.open) return false;
  cell.open = true;

  // if cell has no surrounding bombs, open adjacent cells
  if (cell.count === 0) {
    const cells = getSurroundingCells(cell, state);
    cells.forEach((c, i) => setAsOpen(c, state));
  }
  return false;
}

/** number of mines around a give cell */
function countSurroundingMines(cell: cellState, state: cellState[]) {
  let countedMines = 0;
  const cells = getSurroundingCells(cell, state);

  cells.forEach((cell) => {
    // const cell = getCell(c.col, c.row, state);

    if (!cell) console.log("no cell!");
    if (cell.mine) countedMines++;
  });

  return countedMines;
}

/** get up to nine cells on and around a point */
function getSurroundingCells(cell: cellState, state: cellState[]) {
  const cellsAround: cellState[] = [];

  if (cell.col < 0 || cell.row < 0 || cell.col >= cols || cell.row >= rows)
    return cellsAround;

  const atTop = cell.row === 0;
  const atBottom = cell.row === rows - 1;
  const atLeft = cell.col === 0;
  const atRight = cell.col === cols - 1;

  function addRow(delta: number) {
    if (!atLeft) cellsAround.push(state[cell.index - 1 + delta * cols]);
    cellsAround.push(state[cell.index + delta * cols]);
    if (!atRight) cellsAround.push(state[cell.index + 1 + delta * cols]);
  }
  if (!atTop) addRow(-1);
  addRow(0);
  if (!atBottom) addRow(1);
  return cellsAround;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
