"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = (function () {
    function Game() {
        var boardContainer = document.getElementById('board');
        this.generateBoard(boardContainer, 20, 20);
        console.log("main");
    }
    Game.prototype.generateBoard = function (target, cols, rows) {
        target.style.gridTemplateColumns = "repeat(" + cols + ", 27px)";
        for (var i = rows * cols; i > 0; i--) {
            target.appendChild(this.createCell());
        }
    };
    Game.prototype.createCell = function () {
        var div = document.createElement('div');
        div.className = "cell";
        var icon = '';
        if (Math.random() > .2)
            icon = Math.random() > .5 ? 'icon-flag' : 'icon-bomb';
        div.innerHTML = "<i class='" + icon + "'></i>";
        return div;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map