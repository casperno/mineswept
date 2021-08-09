"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = (function () {
    function Game() {
        this.demoMode = true;
        var boardContainer = document.getElementById("board");
        this.generateBoard(boardContainer, 20, 20);
        console.log("main");
    }
    Game.prototype.generateBoard = function (target, cols, rows) {
        this.cols = cols;
        this.rows = rows;
        target.style.gridTemplateColumns = "repeat(" + cols + ", 29px)";
        var numCells = rows * cols;
        for (var i = 0; i < numCells; i++) {
            target.append(this.createCell(i));
        }
    };
    Game.prototype.createCell = function (index) {
        var _this = this;
        var div = document.createElement("div");
        div.className = "cell";
        div.setAttribute("i", index.toString());
        if (this.demoMode) {
            if (Math.random() > 0.2) {
                if (Math.random() > 0.2) {
                    var icon = Math.random() > 0.5 ? "icon-flag" : "icon-bomb";
                    div.innerHTML = "<i class='" + icon + "'></i>";
                }
                else {
                    div.innerHTML = "<span class='count'>" + Math.ceil(Math.random() * 7).toString() + "</span>";
                }
            }
        }
        div.addEventListener("click", function (e) { return _this.cellClickHandler(e); });
        return div;
    };
    Game.prototype.cellClickHandler = function (e) {
        var elem = e.currentTarget;
        var index = parseInt(elem.getAttribute("i"));
        elem.className += " open";
        console.log("click index ", index, this.getCoordinates(index));
    };
    Game.prototype.getCoordinates = function (index) {
        return { col: index % this.cols, row: Math.floor(index / this.rows) };
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map