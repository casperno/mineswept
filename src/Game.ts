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
    model.distributeMines(cols, rows);

    let board: Board;
    const clickHandler = (col: number, row: number) => {
      model.setAsOpen(col, row);
      board.setMineField(model.getMinefield());
    };
    board = new Board(this.boardContainer, cols, rows, clickHandler);

    board.setMineField(model.getMinefield());
  }
}
