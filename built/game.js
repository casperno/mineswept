"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = (function () {
    function Game() {
        this.demoMode = true;
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
        if (this.demoMode) {
            if (Math.random() > .2) {
                if (Math.random() > .2) {
                    var icon = Math.random() > .5 ? 'icon-flag' : 'icon-bomb';
                    div.innerHTML = "<i class='" + icon + "'></i>";
                }
                else {
                    div.innerHTML = "<span class='count'>" + Math.ceil(Math.random() * 7).toString() + "</span>";
                }
            }
        }
        return div;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map