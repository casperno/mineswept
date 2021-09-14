import { Board } from "./Board";
import { Model } from "./Model";

export class Game {
  private boardContainer: HTMLElement;

  constructor() {
    this.boardContainer = document.getElementById("board");

    this.initGame();
  }

  private initGame() {
    const cols = 20; // TODO: Let user choose size and dificulty
    const rows = 20;
    const difficulty = 0.12; // factor of how many cells are bombs

    // data model containing state of cells
    const model = new Model(cols, rows);
    this.boardContainer.innerHTML = "";

    let isFirstClick = true;

    let board: Board;
    const clickHandler = (col: number, row: number, rightClick: boolean) => {
      // init board on first click
      if (isFirstClick) {
        model.distributeMines({ col, row }, difficulty);
        board.setMineField(model.getMinefield());
        isFirstClick = false;
      }
      // mark with flag on right click
      if (rightClick) {
        model.toggleFlagged(col, row);
      } else {
        // open cell
        const isMine = model.setAsOpen(col, row);
        if (isMine) {
          alert("You bombed out!");
          this.initGame();
        } else {
          // count how many closed cells are left.
          // If closed cells = number of mins => victory!
          if (model.numMines === model.numClosedCells) {
            alert("Congrats, you won!");
            this.initGame();
          }
        }
      }
      board.setMineField(model.getMinefield());
    };

    // create board graphics, register click handlers
    board = new Board(this.boardContainer, cols, rows, clickHandler);
  }
}
