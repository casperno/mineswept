import { Board } from "./Board";

export class Game {
  constructor() {
    const boardContainer = document.getElementById("board");
    const clickHandler = (col: number, row: number) => {
      console.log("clicked " + col + ", " + row);
    };
    const board = new Board(boardContainer, 20, 20, clickHandler);
  }
}
