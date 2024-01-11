"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.scss");
var Game_1 = require("./Game");
var Autosolver_1 = require("./Autosolver");
function init() {
    var game = new Game_1.Game(document.getElementById("board"));
    var autosolver = new Autosolver_1.Autosolver(game, document.getElementById("log"), document.getElementById("next"));
}
init();
//# sourceMappingURL=main.js.map