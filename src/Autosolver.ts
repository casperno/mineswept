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

    this.log("Autosolver started");
  }
  private log(text: string) {
    this.logout.innerText += "\n" + text;
  }
}
