import { minefield } from "./Model";

/**
 * Draws board.
 * Handles click events
 * Sets graphic states
 *
 */
export class Board {
  private demoMode = false;
  private cols: number;
  private rows: number;
  private target: HTMLDivElement;
  private clickClb: (col: number, row: number, rightClick: boolean) => void;
  private cells: HTMLDivElement[] = [];

  constructor(
    target: HTMLElement,
    cols: number,
    rows: number,
    clickClb: (col: number, row: number, rightClick: boolean) => void
  ) {
    this.cols = cols;
    this.rows = rows;
    this.target = target as HTMLDivElement;
    this.clickClb = clickClb;

    this.generateBoard(cols, rows);
  }

  /** update board with minefield from model */
  setMineField(field: minefield) {
    field.cells.forEach((r, index) => {
      let cssClass = ["cell"];
      if (r.flagged) cssClass.push("icon-flag");
      if (r.open) cssClass.push("open");

      const elem = this.cells[index];
      elem.className = cssClass.join(" ");
      elem.innerHTML = " ";
      // add count of surrounding mines
      if (r.count > 0 && !r.mine) {
        const countElemt = document.createElement("span");
        countElemt.className = "count";
        countElemt.innerText = r.count.toString();
        elem.appendChild(countElemt);
      }
    });
  }

  private generateBoard(cols: number, rows: number) {
    this.target.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

    for (let i = 0; i < rows * cols; i++) {
      const elem = this.createCell(i);

      this.cells.push(elem);
      this.target.append(elem);
    }
  }

  private createCell(index: number) {
    const div = document.createElement("div");
    div.className = "cell";
    div.setAttribute("i", index.toString()); // set index to be able to identify cell

    if (this.demoMode) {
      if (Math.random() > 0.2) {
        if (Math.random() > 0.2) {
          const icon = Math.random() > 0.5 ? "icon-flag" : "icon-bomb";
          div.innerHTML = `<i class='${icon}'></i>`;
        } else {
          div.innerHTML = `<span class='count'>${Math.ceil(
            Math.random() * 7
          ).toString()}</span>`;
        }
      }
    }

    div.addEventListener("click", (e: MouseEvent) =>
      this.cellClickHandler(e, false)
    );
    div.addEventListener("contextmenu", (e: MouseEvent) =>
      this.cellClickHandler(e, true)
    );

    return div;
  }

  private cellClickHandler(e: MouseEvent, contextClick: boolean) {
    const elem = e.currentTarget as HTMLElement;
    const index = parseInt(elem.getAttribute("i"));

    const { col, row } = this.getCoordinates(index);
    this.clickClb(col, row, contextClick);
    e.preventDefault();
  }

  private getCoordinates(index: number) {
    return { col: index % this.cols, row: Math.floor(index / this.rows) };
  }
}
