import { MouseEventHandler } from "react";
import { cellState } from "./App";
import { minefield } from "./Model";

/**
 * Draws board.
 * Handles click events
 * Sets graphic states
 *
 */
export function Board({
  cols,
  rows,
  state,
  handleClick,
}: {
  cols: number;
  rows: number;
  state: cellState[];
  handleClick: (i: number, context: boolean) => void;
}) {
  const demoMode = false;

  /* 
  function init(
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
  } */

  return (
    <div
      className="board-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 30px)` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <Cell
          index={i}
          state={state[i]}
          onSquareClick={(e: React.MouseEvent) => {
            e.preventDefault();
            // console.log("normal click");
            handleClick(i, false);
          }}
          onContextMenu={(e: React.MouseEvent) => {
            e.preventDefault();
            // console.log("context");
            handleClick(i, true);
          }}
        ></Cell>
      ))}
    </div>
  );
}

function generateBoard(cols: number, rows: number) {}

function Cell({
  index,
  state,
  onSquareClick,
  onContextMenu,
}: {
  index: number;
  state: cellState;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  onContextMenu: React.MouseEventHandler<HTMLButtonElement>;
}) {
  let cssClass = ["cell"];
  if (state.flagged) cssClass.push("icon-flag");
  if (state.open) cssClass.push("open");
  if (state.highlighted) cssClass.push("highlight");
  /*// add count of surrounding mines
      if (r.count > 0 && !r.mine && r.open) {
        const countElemt = document.createElement("span");
        countElemt.className = "count";
        countElemt.innerText = r.count.toString();
        elem.appendChild(countElemt);
      */

  // && state.open

  return (
    <button
      key={index}
      className={cssClass.join(" ")}
      onClick={onSquareClick}
      onContextMenu={onContextMenu}
    >
      {state.count > 0 && !state.mine ? (
        <span className="count">{state.count}</span>
      ) : (
        ""
      )}
      {state.mine}
    </button>
  );
}

/*  const createCell(index: number) {
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
 */

/** update board with minefield from model 
  setMineField(field: minefield) {
    field.cells.forEach((r, index) => {
      let cssClass = ["cell"];
      if (r.flagged) cssClass.push("icon-flag");
      if (r.open) cssClass.push("open");
      if (r.highlighted) cssClass.push("highlight");

      const elem = this.cells[index];
      elem.className = cssClass.join(" ");
      elem.innerHTML = " ";
      // add count of surrounding mines
      if (r.count > 0 && !r.mine && r.open) {
        const countElemt = document.createElement("span");
        countElemt.className = "count";
        countElemt.innerText = r.count.toString();
        elem.appendChild(countElemt);
      }
    });
  }

  const generateBoard(cols: number, rows: number) {
    this.target.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

    for (let i = 0; i < rows * cols; i++) {
      const elem = this.createCell(i);

      this.cells.push(elem);
      this.target.append(elem);
    }
  }



  const cellClickHandler(e: MouseEvent, contextClick: boolean) {
    const elem = e.currentTarget as HTMLElement;
    const index = parseInt(elem.getAttribute("i"));

    const { col, row } = this.getCoordinates(index);
    this.clickClb(col, row, contextClick);
    e.preventDefault();
  }

  const getCoordinates(index: number) {
    return { col: index % this.cols, row: Math.floor(index / this.rows) };
  }
}
*/
