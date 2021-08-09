import { Board } from "./Board";

export class Game {
  private boardContainer: HTMLElement;

  constructor() {
    this.boardContainer = document.getElementById("board");

    this.initBoard();
  }

  private initBoard() {
    let board: Board;
    const clickHandler = (col: number, row: number) => {
      board.setOpen(col, row);
    };
    board = new Board(this.boardContainer, 20, 20, clickHandler);
  }
}
