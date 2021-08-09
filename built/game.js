"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var Game = (function () {
    function Game() {
        var boardContainer = document.getElementById("board");
        var clickHandler = function (col, row) {
            console.log("clicked " + col + ", " + row);
        };
        var board = new Board_1.Board(boardContainer, 20, 20, clickHandler);
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map