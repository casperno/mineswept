import { Board } from "./Board";
import { Model } from "./Model";

export class Game {
  private boardContainer: HTMLElement;
  board: Board;
  isFirstClick: boolean;
  model: Model;
  difficulty: number;

  constructor(boardContainer: HTMLElement) {
    this.boardContainer = boardContainer;

    this.initGame();
  }

  private initGame() {
    const cols = 20; // TODO: Let user choose size and dificulty
    const rows = 20;
    this.difficulty = 0.12; // factor of how many cells are bombs

    // data model containing state of cells
    this.model = new Model(cols, rows);
    this.boardContainer.innerHTML = "";

    this.isFirstClick = true;

    // create board graphics, register click handlers
    this.board = new Board(
      this.boardContainer,
      cols,
      rows,
      (col: number, row: number, rightClick: boolean) =>
        this.clickHandler(col, row, rightClick)
    );
  }

  getMinefield() {
    return this.model.getMinefield();
  }

  mark(col: number, row: number) {
    this.model.getCell(col, row).highlighted = true;
    this.board.setMineField(this.model.getMinefield());
  }

  clickHandler(
    col: number,
    row: number,
    rightClick: boolean,
    flagState?: boolean
  ) {
    // init board on first click
    if (this.isFirstClick) {
      this.model.distributeMines({ col, row }, this.difficulty);
      this.board.setMineField(this.model.getMinefield());
      this.isFirstClick = false;
    }
    // mark with flag on right click
    if (rightClick) {
      this.model.toggleFlagged(col, row, flagState);
    } else {
      // open cell
      const isMine = this.model.setAsOpen(col, row);
      if (isMine) {
        alert("You bombed out!");
        this.initGame();
      } else {
        // count how many closed cells are left.
        // If closed cells = number of mins => victory!
        if (this.model.numMines === this.model.numClosedCells) {
          alert("Congrats, you won!");
          this.initGame();
        }
      }
    }
    this.board.setMineField(this.model.getMinefield());
  }
}
