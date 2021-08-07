"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = (function () {
    function Game() {
        var boardContainer = document.getElementById('board');
        this.generateBoard(boardContainer, 30, 10);
        console.log("main");
    }
    Game.prototype.generateBoard = function (target, cols, rows) {
        target.style.gridTemplateColumns = "repeat(" + cols + ", 10px)";
        for (var i = rows * cols; i > 0; i--) {
            target.appendChild(this.createCell());
        }
    };
    Game.prototype.createCell = function () {
        var div = document.createElement('div');
        div.className = "mine";
        div.innerHTML = "O";
        return div;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map