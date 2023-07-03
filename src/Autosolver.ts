import { Game } from "./Game";

/** Auto solver of Mineswept. Goes step by step when button is pressed,
 * show element it's working on
 */
export class Autosolver {
  private game: Game;
  private logout: HTMLElement;
  private nextButton: HTMLElement;

  constructor(game: Game, logout: HTMLElement, nextButton: HTMLElement) {
    this.game = game;
    this.logout = logout;
    this.nextButton = nextButton;

    this.log("Autosolver first click");
    this.game.clickHandler(10, 10, false);

    this.nextButton.addEventListener("click", (e: MouseEvent) => {
      this.next();
    });

    this.log("Mark open cells with number");
    // this.findOpenWithNumber().forEach((openCell) => {
    //   this.game.mark(openCell[0], openCell[1]);
    // });

    this.log("Mark easy bombs");
    this.findClosedMatchingNumber();
  }

  private findClosedMatchingNumber() {
    let openWithNumber = this.findOpenWithNumber().map((o) => ({
      col: o[0],
      row: o[1],
      cell: this.game.model.getCell(o[0], o[1]),
    }));

    openWithNumber.forEach((openCell) => {
      const surrounding = this.game.model
        .getSurroundingCells(openCell.col, openCell.row)
        .map((coords) => this.game.model.getCell(coords.col, coords.row));

      const surroundingAndClosed = surrounding.filter(
        (cell) => !cell.open
      ).length;

      if (surroundingAndClosed == openCell.cell.count)
        this.game.mark(openCell.col, openCell.row);
    });
  }

  private findOpenWithNumber() {
    let field = this.game.getMinefield();

    let openWithNumber: [number, number][] = [];

    field.cells.forEach((cell, index) => {
      if (cell.open && cell.count > 0) {
        const col = index % field.cols;
        const row = Math.floor(index / field.rows);
        openWithNumber.push([col, row]);
      }
    });
    return openWithNumber;
  }

  private next() {
    this.log("next");
  }

  private log(text: string) {
    this.logout.innerText += text + "\n";
  }
}
