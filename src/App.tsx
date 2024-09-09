import { useState } from "react";
import { Board } from "./Board";
import { cell } from "./Model";

export type cellState = {
  open: boolean;
  mine: boolean;
  count: number;
  flagged: boolean;
  highlighted: boolean;
  id: number;
};

const cols = 10;
const rows = 10;
const factor = 0.1; // difficulty as percent of cells that are mines
let isFirstClick = true;

export default function Game() {
  let initial: cellState[] = [];
  for (let i = 0; i < rows * cols; i++) {
    initial.push({
      id: i,
      open: false,
      mine: false,
      count: 0,
      flagged: false,
      highlighted: false,
    });
  }
  const [state, setState] = useState<cellState[]>(initial);

  let numMines = 10;

  console.log("game", isFirstClick);

  function handleClick(i: number, context: boolean) {
    let nextstate = state.slice();

    console.log(i, isFirstClick);

    if (isFirstClick) {
      isFirstClick = false;
      nextstate = initMineField(nextstate, i);
    }

    if (context) nextstate[i].flagged = !nextstate[i].flagged;
    else {
      // open cell
      const isMine = setAsOpen(i, nextstate);
      if (isMine) {
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

  const initialClick = getCoordinates(clickedIndex);

  const newState = state.slice();

  let max = 1000;

  while (numMines > 0 && max--) {
    const col = getRandomInt(cols);
    const row = getRandomInt(rows);

    // check that mine is not placed on or next to initial click
    if (
      col >= initialClick.col - 1 &&
      col <= initialClick.col + 1 &&
      row >= initialClick.row - 1 &&
      row <= initialClick.row + 1
    ) {
      continue;
    }
    const cell = getCell(col, row, state);
    if (!cell.mine) {
      cell.mine = true;
      numMines--;
    }
  }

  // calculate number of surrounding mines for each cell
  newState.forEach(
    (cell, index) =>
      (cell.count = countSurroundingMines(
        index % cols,
        Math.floor(index / rows),
        state
      ))
  );

  return newState;
}

function setAsOpen(index: number, state: cellState[]): boolean {
  const cell = state[index];
  if (cell.mine) return true;
  if (cell.open) return false;
  cell.open = true;

  // if cell has no surrounding bombs, open adjacent cells
  if (cell.count === 0) {
    const coord = getCoordinates(index);
    const cells = getSurroundingCells(coord.col, coord.row, state);
    cells.forEach((c, i) => setAsOpen(getCell(c.col, c.row, state).id, state));
  }
  return false;
}

function getCoordinates(index: number) {
  return { col: index % cols, row: Math.floor(index / rows) };
}

/** get cell object at position */
function getCell(col: number, row: number, state: cellState[]) {
  return state[col + row * cols];
}

/** number of mines around a give cell */
function countSurroundingMines(col: number, row: number, state: cellState[]) {
  let countedMines = 0;
  const cells = getSurroundingCells(col, row, state);

  cells.forEach((c) => {
    const cell = getCell(c.col, c.row, state);

    if (!cell) console.log("no cell!", c.col, c.row);
    if (cell.mine) countedMines++;
  });

  return countedMines;
}

/** get up to nine cells on and around a point */
function getSurroundingCells(col: number, row: number, state: cellState[]) {
  const coords: { col: number; row: number }[] = [];

  if (col < 0 || row < 0 || col >= cols || row >= rows) return coords;

  const atTop = row === 0;
  const atBottom = row === rows - 1;
  const atLeft = col === 0;
  const atRight = col === cols - 1;

  function addRow(delta: number) {
    if (!atLeft) coords.push({ col: col - 1, row: row + delta });
    coords.push({ col, row: row + delta });
    if (!atRight) coords.push({ col: col + 1, row: row + delta });
  }
  if (!atTop) addRow(-1);
  addRow(0);
  if (!atBottom) addRow(1);
  return coords;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
