"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var Model_1 = require("./Model");
var Game = (function () {
    function Game() {
        this.boardContainer = document.getElementById("board");
        this.initGame();
    }
    Game.prototype.initGame = function () {
        var cols = 20;
        var rows = 20;
        var board;
        var clickHandler = function (col, row) {
            board.setOpen(col, row);
        };
        board = new Board_1.Board(this.boardContainer, cols, rows, clickHandler);
        var model = new Model_1.Model();
        model.distributeMines(cols, rows);
        board.setMineField(model.getMinefield());
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map