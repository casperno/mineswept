import { Game } from "./Game";
import { cell } from "./Model";

/** Auto solver of Mineswept. Goes step by step when button is pressed,
 * highlights the elements it's working on
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

    this.next();
  }

  private findEqualCount(test: (c: cell) => boolean) {
    let openWithNumber = this.findOpenWithNumber().map((o) => ({
      col: o[0],
      row: o[1],
      cell: this.game.model.getCell(o[0], o[1]),
      surrounding: [{ row: 0, col: 0 }],
    }));

    const closedEqualCount = openWithNumber.filter((openCell) => {
      const surroundingCoods = this.game.model.getSurroundingCells(
        openCell.col,
        openCell.row
      );

      const surrounding = surroundingCoods.map((coords) =>
        this.game.model.getCell(coords.col, coords.row)
      );

      openCell.surrounding = surroundingCoods;

      const surroundingAndClosed = surrounding.filter((cell) =>
        test(cell)
      ).length;

      return surroundingAndClosed == openCell.cell.count;
    });
    return closedEqualCount;
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
    this.log("Mark obvious bombs");
    const surroundingClosedEqualCount = this.findEqualCount(
      (cell: cell) => !cell.open
    );
    surroundingClosedEqualCount.forEach((openCell) =>
      openCell.surrounding.forEach((around) =>
        this.game.model.toggleFlagged(around.col, around.row, true)
      )
    );

    this.game.model.cells.forEach((c) => (c.highlighted = false));

    this.log("Open obvious non-bombs");
    const surroundingFlaggedEqualCount = this.findEqualCount(
      (cell: cell) => cell.flagged
    );

    // open all closed, non-flagged surrounding
    surroundingFlaggedEqualCount.forEach((cell) => {
      const closedNotFlagged = cell.surrounding.filter((coords) => {
        const c = this.game.model.getCell(coords.col, coords.row);
        return !c.flagged && !c.open;
      });
      closedNotFlagged.forEach((c) => {
        this.game.clickHandler(c.col, c.row, false);
        this.game.mark(c.col, c.row);
      });
    });
    this.game.board.setMineField(this.game.model.getMinefield());
  }

  /** route logging to passed html element */
  private log(text: string) {
    this.logout.innerText += text + "\n";
  }
}
