import "./style.scss";
import { Game } from "./Game";
import { Autosolver } from "./Autosolver";

function init() {
  let game = new Game(document.getElementById("board"));
  let autosolver = new Autosolver(
    game,
    document.getElementById("log"),
    document.getElementById("next")
  );
}
init();
