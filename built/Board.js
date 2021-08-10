"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var Board = (function () {
    function Board(target, cols, rows, clickClb) {
        this.demoMode = false;
        this.elements = [];
        this.cols = cols;
        this.rows = rows;
        this.target = target;
        this.clickClb = clickClb;
        this.generateBoard(cols, rows);
    }
    Board.prototype.setMineField = function (field) {
        var _this = this;
        field.forEach(function (c, col) {
            return c.forEach(function (r, row) {
                var cssClass = ["cell"];
                if (r.flagged)
                    cssClass.push("icon-flag");
                if (r.open)
                    cssClass.push("open");
                var elem = _this.elements[col][row];
                elem.className = cssClass.join(" ");
                elem.innerHTML = " ";
                if (r.count > 0 && !r.mine) {
                    var countElemt = document.createElement("span");
                    countElemt.className = "count";
                    countElemt.innerText = r.count.toString();
                    elem.appendChild(countElemt);
                }
            });
        });
    };
    Board.prototype.generateBoard = function (cols, rows) {
        this.target.style.gridTemplateColumns = "repeat(" + cols + ", 29px)";
        var c = 0;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var elem = this.createCell(c++);
                if (!this.elements[j])
                    this.elements[j] = [];
                this.elements[j][i] = elem;
                this.target.append(elem);
            }
        }
    };
    Board.prototype.createCell = function (index) {
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
        div.addEventListener("click", function (e) {
            return _this.cellClickHandler(e, false);
        });
        div.addEventListener("contextmenu", function (e) {
            return _this.cellClickHandler(e, true);
        });
        return div;
    };
    Board.prototype.cellClickHandler = function (e, contextClick) {
        var elem = e.currentTarget;
        var index = parseInt(elem.getAttribute("i"));
        var _a = this.getCoordinates(index), col = _a.col, row = _a.row;
        this.clickClb(col, row, contextClick);
        e.preventDefault();
    };
    Board.prototype.getElement = function (col, row) { };
    Board.prototype.getCoordinates = function (index) {
        return { col: index % this.cols, row: Math.floor(index / this.rows) };
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=Board.js.map