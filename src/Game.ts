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

    let board: Board;
    const clickHandler = (col: number, row: number) => {
      board.setOpen(col, row);
    };
    board = new Board(this.boardContainer, cols, rows, clickHandler);

    const model = new Model();
    model.distributeMines(cols, rows);

    board.setMineField(model.getMinefield());
  }
}
