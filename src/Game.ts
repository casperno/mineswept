import { Board } from "./Board";

export class Game {
  constructor() {
    const boardContainer = document.getElementById("board");
    let board: Board;
    const clickHandler = (col: number, row: number) => {
      console.log("clicked " + col + ", " + row);
      board.setOpen(col, row);
    };
    board = new Board(boardContainer, 20, 20, clickHandler);
  }
}
