import { cellState } from "./App";

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
  return (
    <div
      className="board-grid"
      key="board$4"
      style={{ gridTemplateColumns: `repeat(${cols}, 30px)` }}
    >
      {state.map((s, i) => (
        <Cell
          key={s.index}
          state={s}
          onSquareClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleClick(i, false);
          }}
          onContextMenu={(e: React.MouseEvent) => {
            e.preventDefault();
            handleClick(i, true);
          }}
        ></Cell>
      ))}
    </div>
  );
}

function generateBoard(cols: number, rows: number) {}

function Cell({
  state,
  onSquareClick,
  onContextMenu,
}: {
  state: cellState;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  onContextMenu: React.MouseEventHandler<HTMLButtonElement>;
}) {
  let cssClass = ["cell"];
  if (state.flagged && !state.open) cssClass.push("icon-flag");
  if (state.open) cssClass.push("open");
  if (state.highlighted) cssClass.push("highlight");
  if (state.mine && state.open) cssClass.push("icon-bomb");

  return (
    <button
      className={cssClass.join(" ")}
      onClick={onSquareClick}
      onContextMenu={onContextMenu}
    >
      {state.count > 0 && !state.mine && state.open ? (
        <span className="count">{state.count}</span>
      ) : (
        ""
      )}
    </button>
  );
}
