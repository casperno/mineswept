"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var Board = (function () {
    function Board(target, cols, rows, clickClb) {
        this.demoMode = false;
        this.cells = [];
        this.cols = cols;
        this.rows = rows;
        this.target = target;
        this.clickClb = clickClb;
        this.generateBoard(cols, rows);
    }
    Board.prototype.setMineField = function (field) {
        var _this = this;
        field.cells.forEach(function (r, index) {
            var cssClass = ["cell"];
            if (r.flagged)
                cssClass.push("icon-flag");
            if (r.open)
                cssClass.push("open");
            var elem = _this.cells[index];
            elem.className = cssClass.join(" ");
            elem.innerHTML = " ";
            if (r.count > 0 && !r.mine) {
                var countElemt = document.createElement("span");
                countElemt.className = "count";
                countElemt.innerText = r.count.toString();
                elem.appendChild(countElemt);
            }
        });
    };
    Board.prototype.generateBoard = function (cols, rows) {
        this.target.style.gridTemplateColumns = "repeat(".concat(cols, ", 30px)");
        for (var i = 0; i < rows * cols; i++) {
            var elem = this.createCell(i);
            this.cells.push(elem);
            this.target.append(elem);
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
                    div.innerHTML = "<i class='".concat(icon, "'></i>");
                }
                else {
                    div.innerHTML = "<span class='count'>".concat(Math.ceil(Math.random() * 7).toString(), "</span>");
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
    Board.prototype.getCoordinates = function (index) {
        return { col: index % this.cols, row: Math.floor(index / this.rows) };
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=Board.js.map