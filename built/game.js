"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var Game = (function () {
    function Game() {
        this.boardContainer = document.getElementById("board");
        this.initBoard();
    }
    Game.prototype.initBoard = function () {
        var board;
        var clickHandler = function (col, row) {
            board.setOpen(col, row);
        };
        board = new Board_1.Board(this.boardContainer, 20, 20, clickHandler);
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map