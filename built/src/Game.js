"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var Model_1 = require("./Model");
var Game = (function () {
    function Game(boardContainer) {
        this.boardContainer = boardContainer;
        this.initGame();
    }
    Game.prototype.initGame = function () {
        var _this = this;
        var cols = 20;
        var rows = 20;
        this.difficulty = 0.12;
        this.model = new Model_1.Model(cols, rows);
        this.boardContainer.innerHTML = "";
        this.isFirstClick = true;
        this.board = new Board_1.Board(this.boardContainer, cols, rows, function (col, row, rightClick) {
            return _this.clickHandler(col, row, rightClick);
        });
    };
    Game.prototype.getMinefield = function () {
        return this.model.getMinefield();
    };
    Game.prototype.mark = function (col, row) {
        this.model.getCell(col, row).highlighted = true;
        this.board.setMineField(this.model.getMinefield());
    };
    Game.prototype.clickHandler = function (col, row, rightClick, flagState) {
        if (this.isFirstClick) {
            this.model.distributeMines({ col: col, row: row }, this.difficulty);
            this.board.setMineField(this.model.getMinefield());
            this.isFirstClick = false;
        }
        if (rightClick) {
            this.model.toggleFlagged(col, row, flagState);
        }
        else {
            var isMine = this.model.setAsOpen(col, row);
            if (isMine) {
                alert("You bombed out!");
                this.initGame();
            }
            else {
                if (this.model.numMines === this.model.numClosedCells) {
                    alert("Congrats, you won!");
                    this.initGame();
                }
            }
        }
        this.board.setMineField(this.model.getMinefield());
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map