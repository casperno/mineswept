export type minefield = {
  rows: number;
  cols: number;
  cells: cell[];
};

type cell = {
  mine: boolean;
  count: number;
  open: boolean;
  flagged: boolean;
};

/** Data model for cell grid */
export class Model {
  private cols: number;
  private rows: number;
  private cells: cell[] = [];
  private _numMines: number;

  /** init model with size as `cols` and `rows` */
  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;

    let numCells = cols * rows;
    while (numCells--) {
      this.cells.push({
        mine: false,
        count: 0,
        open: false,
        flagged: false,
      });
    }
  }

  /** get cell object at position */
  getCell(col: number, row: number) {
    return this.cells[col + row * this.cols];
  }

  /** get up to nine cells on and around a point */
  getSurroundingCells(col: number, row: number) {
    const coord: { col: number; row: number }[] = [];

    if (col < 0 || row < 0 || col >= this.cols || row >= this.rows)
      return coord;

    const atTop = row === 0;
    const atBottom = row === this.rows - 1;
    const atLeft = col === 0;
    const atRight = col === this.cols - 1;

    function addRow(delta: number) {
      if (!atLeft) coord.push({ col: col - 1, row: row + delta });
      coord.push({ col, row: row + delta });
      if (!atRight) coord.push({ col: col + 1, row: row + delta });
    }
    if (!atTop) addRow(-1);
    addRow(0);
    if (!atBottom) addRow(1);

    return coord;
  }

  toggleFlagged(col: number, row: number) {
    const cell = this.getCell(col, row);
    if (!cell.open) cell.flagged = !cell.flagged;
  }

  setAsOpen(col: number, row: number): boolean {
    const cell = this.getCell(col, row);
    if (cell.mine) return true;
    if (cell.open) return false;
    cell.open = true;

    // if cell has no surrounding bombs, open adjacent cells
    if (cell.count === 0) {
      const cells = this.getSurroundingCells(col, row);
      cells.forEach((c) => this.setAsOpen(c.col, c.row));
    }
    return false;
  }

  /** number of mines around a give cell */
  private countSurroundingMines(col: number, row: number) {
    let countedMines = 0;
    const cells = this.getSurroundingCells(col, row);

    cells.forEach((c) => {
      const cell = this.getCell(c.col, c.row);

      if (!cell) console.log("no cell!", c.col, c.row);
      if (cell.mine) countedMines++;
    });

    return countedMines;
  }

  /** total number of mines on board */
  get numMines() {
    return this._numMines;
  }

  /** number of cells not opened by player */
  get numClosedCells() {
    return this.cells.reduce((p, cell) => (cell.open ? 0 : 1) + p, 0);
  }

  /** inits board with random distribution of mines */
  distributeMines(
    // make sure first click always is on a cell without mines in or around it.
    initialClick: { col: number; row: number },
    factor = 0.1 // difficulty as percent of cells that are mines
  ) {
    const cols = this.cols;
    const rows = this.rows;
    let numMines = (this._numMines = Math.floor(cols * rows * factor));

    while (numMines > 0) {
      const col = this.getRandomInt(cols);
      const row = this.getRandomInt(rows);

      // check that mine is not placed on or next to initial click
      if (
        col >= initialClick.col - 1 &&
        col <= initialClick.col + 1 &&
        row >= initialClick.row - 1 &&
        row <= initialClick.row + 1
      ) {
        continue;
      }
      const cell = this.getCell(col, row);
      if (!cell.mine) {
        cell.mine = true;
        numMines--;
      }
    }
    // calculate number of surrounding mines for each cell
    this.cells.forEach(
      (cell, index) =>
        (cell.count = this.countSurroundingMines(
          index % cols,
          Math.floor(index / rows)
        ))
    );
  }

  getMinefield() {
    return { cols: this.cols, rows: this.rows, cells: this.cells };
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
