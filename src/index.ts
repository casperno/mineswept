import "./style.scss";
import { Game } from "./Game";
import { Autosolver } from "./Autosolver";

function init() {
  // init a standard game
  let game = new Game(document.getElementById("board"));

  const url = new URL(window.location.href);
  const auto = url.searchParams.get("auto");

  if (auto.toLowerCase() == "true") {
    // Autosolver to play game manually.
    // set up autosolver of game, hook it upp with a place to output log
    // and a button element for progressing
    let autosolver = new Autosolver(
      game,
      document.getElementById("log"),
      document.getElementById("next")
    );
  }
}
init();
