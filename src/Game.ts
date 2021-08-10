import { Board } from "./Board";
import { Model } from "./Model";

export class Game {
  private boardContainer: HTMLElement;

  constructor() {
    this.boardContainer = document.getElementById("board");

    this.initGame();
  }

  private initGame() {
    const cols = 20;
    const rows = 20;

    const model = new Model();
    this.boardContainer.innerHTML = "";
    model.distributeMines(cols, rows);

    let board: Board;
    const clickHandler = (col: number, row: number, rightClick: boolean) => {
      if (rightClick) {
        model.toggleFlagged(col, row);
      } else {
        const isMine = model.setAsOpen(col, row);
        if (isMine) {
          alert("You bombed out!");
          this.initGame();
        }
      }
      board.setMineField(model.getMinefield());
    };
    board = new Board(this.boardContainer, cols, rows, clickHandler);

    board.setMineField(model.getMinefield());
  }
}
