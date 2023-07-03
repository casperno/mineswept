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
        var _this = this;
        var cols = 20;
        var rows = 20;
        var difficulty = 0.12;
        var model = new Model_1.Model(cols, rows);
        this.boardContainer.innerHTML = "";
        var isFirstClick = true;
        var board;
        var clickHandler = function (col, row, rightClick) {
            if (isFirstClick) {
                model.distributeMines({ col: col, row: row }, difficulty);
                board.setMineField(model.getMinefield());
                isFirstClick = false;
            }
            if (rightClick) {
                model.toggleFlagged(col, row);
            }
            else {
                var isMine = model.setAsOpen(col, row);
                if (isMine) {
                    alert("You bombed out!");
                    _this.initGame();
                }
                else {
                    if (model.numMines === model.numClosedCells) {
                        alert("Congrats, you won!");
                        _this.initGame();
                    }
                }
            }
            board.setMineField(model.getMinefield());
        };
        board = new Board_1.Board(this.boardContainer, cols, rows, clickHandler);
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map