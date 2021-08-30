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

export class Model {
  private cols: number;
  private rows: number;
  private cells: cell[] = [];
  private _numMines: number;
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

  get numMines() {
    return this._numMines;
  }

  get numClosedCells() {
    return this.cells.reduce((p, cell) => (cell.open ? 0 : 1) + p, 0);
  }

  distributeMines(
    // make sure first click always is on a cell without mines in or around it.
    initialClick: { col: number; row: number },
    factor = 0.02
  ) {
    const cols = this.cols;
    const rows = this.rows;
    let numMines = (this._numMines = Math.floor(cols * rows * factor));

    while (numMines > 0) {
      const col = this.getRandomInt(cols);
      const row = this.getRandomInt(rows);

      // check that it's not near inital click
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
