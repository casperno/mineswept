import { useState } from "react";
import { Board } from "./Board";

export type cellState = {
  open: boolean;
  flagged: boolean;
  highlighted: boolean;
};

const cols = 10;
const rows = 10;

export default function Game() {
  let initial: cellState[] = [];
  for (let i = 0; i < rows * cols; i++) {
    initial.push({
      open: Math.random() > 0.5,
      flagged: Math.random() > 0.5,
      highlighted: false,
    });
  }
  const [state, setState] = useState<cellState[]>(initial);

  function handleClick(i: number, context: boolean) {
    let nextstate = state.slice();
    console.log(i, context);
    if (context) nextstate[i].flagged = !nextstate[i].flagged;

    setState(nextstate);
  }

  return (
    <>
      <h1>Mineswept, the game</h1>
      <Board cols={cols} rows={rows} state={state} handleClick={handleClick} />
      {/*  <div id="output">
        <div id="log"></div>
        <button id="next">Next</button>
      </div> */}
    </>
  );
}
