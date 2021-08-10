export type minefield = { mine: boolean; count: number; open: boolean }[][];

export class Model {
  cols: number;
  rows: number;
  field: minefield = [];
  constructor() {}

  setAsOpen(col: number, row: number) {
    this.field[col][row].open = true;

    // if cell has no surrounding bombs, open ajacent cells
    if (this.field[col][row].count === 0) {
      for (let i = col - 1; i < col + 2; i++) {
        for (let j = row - 1; j < row + 2; j++) {
          if (this.field[i] && this.field[i][j] && !this.field[i][j].open) {
            this.setAsOpen(i, j);
          }
        }
      }
    }
  }

  private countSurroundingMines(col: number, row: number) {
    let countedMines = 0;
    for (let i = col - 1; i < col + 2; i++) {
      for (let j = row - 1; j < row + 2; j++) {
        if (this.field[i] && this.field[i][j]?.mine) {
          countedMines++;
        }
      }
    }
    return countedMines;
  }

  distributeMines(cols: number, rows: number, factor = 0.1) {
    for (let i = 0; i < cols; i++) {
      this.field[i] = [];
      for (let j = 0; j < rows; j++) {
        this.field[i][j] = { mine: false, count: 0, open: false };
      }
    }

    let numMines = Math.floor(cols * rows * factor);

    while (numMines > 0) {
      const col = this.getRandomInt(cols);
      const row = this.getRandomInt(rows);

      if (!this.field[col][row].mine) {
        this.field[col][row].mine = true;
        numMines--;
      }
    }
    this.field.forEach((c, col) =>
      c.forEach((r, row) => {
        this.field[col][row].count = this.countSurroundingMines(col, row);
      })
    );
  }

  getMinefield() {
    return this.field;
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}