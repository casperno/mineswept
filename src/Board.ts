/**
 * Draws board.
 * Handles click events
 * Sets graphic states
 *
 */

import { minefield } from "./Model";

export class Board {
  private demoMode = false;
  private cols: number;
  private rows: number;
  private target: HTMLDivElement;
  private clickClb: (col: number, row: number) => void;
  private elements: HTMLDivElement[][] = [];

  constructor(
    target: HTMLElement,
    cols: number,
    rows: number,
    clickClb: (col: number, row: number) => void
  ) {
    this.cols = cols;
    this.rows = rows;
    this.target = target as HTMLDivElement;
    this.clickClb = clickClb;

    this.generateBoard(cols, rows);
  }

  setMineField(field: minefield) {
    field.forEach((c, col) =>
      c.forEach((r, row) => {
        if (r.mine) this.setMine(col, row);
        else if (r.count > 0) {
          this.setCount(col, row, r.count);
        }
      })
    );
  }
  setCount(col: number, row: number, count: number) {
    const countElemt = document.createElement("span");
    countElemt.className = "count";
    countElemt.innerText = count.toString();
    const elem = this.elements[col][row];
    elem.appendChild(countElemt);
  }

  setMine(col: number, row: number) {
    const elem = this.elements[col][row];
    elem.className += " icon-bomb";
  }

  setOpen(col: number, row: number) {
    const elem = this.elements[col][row];
    elem.className += " open";
  }

  private generateBoard(cols: number, rows: number) {
    this.target.style.gridTemplateColumns = `repeat(${cols}, 29px)`;

    let c = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const elem = this.createCell(c++);
        if (!this.elements[j]) this.elements[j] = [];
        this.elements[j][i] = elem;
        this.target.append(elem);
      }
    }
  }

  private createCell(index: number) {
    const div = document.createElement("div");
    div.className = "cell";
    div.setAttribute("i", index.toString());

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

    div.addEventListener("click", (e: MouseEvent) => this.cellClickHandler(e));

    return div;
  }

  private cellClickHandler(e: MouseEvent) {
    const elem = e.currentTarget as HTMLElement;
    const index = parseInt(elem.getAttribute("i"));

    //elem.className += " open";
    const { col, row } = this.getCoordinates(index);
    this.clickClb(col, row);
  }
  private getElement(col: number, row: number) {}
  private getCoordinates(index: number) {
    return { col: index % this.cols, row: Math.floor(index / this.rows) };
  }
}
