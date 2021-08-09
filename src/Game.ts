export class Game {
  private demoMode = true;
  private cols: number;
  private rows: number;

  constructor() {
    const boardContainer = document.getElementById("board");
    this.generateBoard(boardContainer, 20, 20);
    console.log("main");
  }

  private generateBoard(target: HTMLElement, cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;

    (
      target as HTMLDivElement
    ).style.gridTemplateColumns = `repeat(${cols}, 29px)`;

    const numCells = rows * cols;
    for (let i = 0; i < numCells; i++) {
      target.append(this.createCell(i));
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

    elem.className += " open";

    console.log("click index ", index, this.getCoordinates(index));
  }

  private getCoordinates(index: number) {
    return { col: index % this.cols, row: Math.floor(index / this.rows) };
  }
}
