"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = (function () {
    function Model() {
        this.field = [];
    }
    Model.prototype.toggleFlagged = function (col, row) {
        this.field[col][row].flagged = !this.field[col][row].flagged;
    };
    Model.prototype.setAsOpen = function (col, row) {
        if (this.field[col][row].mine)
            return true;
        this.field[col][row].open = true;
        if (this.field[col][row].count === 0) {
            for (var i = col - 1; i < col + 2; i++) {
                for (var j = row - 1; j < row + 2; j++) {
                    if (this.field[i] && this.field[i][j] && !this.field[i][j].open) {
                        this.setAsOpen(i, j);
                    }
                }
            }
        }
    };
    Model.prototype.countSurroundingMines = function (col, row) {
        var _a;
        var countedMines = 0;
        for (var i = col - 1; i < col + 2; i++) {
            for (var j = row - 1; j < row + 2; j++) {
                if (this.field[i] && ((_a = this.field[i][j]) === null || _a === void 0 ? void 0 : _a.mine)) {
                    countedMines++;
                }
            }
        }
        return countedMines;
    };
    Model.prototype.distributeMines = function (cols, rows, factor) {
        var _this = this;
        if (factor === void 0) { factor = 0.1; }
        for (var i = 0; i < cols; i++) {
            this.field[i] = [];
            for (var j = 0; j < rows; j++) {
                this.field[i][j] = {
                    mine: false,
                    count: 0,
                    open: false,
                    flagged: false,
                };
            }
        }
        var numMines = Math.floor(cols * rows * factor);
        while (numMines > 0) {
            var col = this.getRandomInt(cols);
            var row = this.getRandomInt(rows);
            if (!this.field[col][row].mine) {
                this.field[col][row].mine = true;
                numMines--;
            }
        }
        this.field.forEach(function (c, col) {
            return c.forEach(function (r, row) {
                _this.field[col][row].count = _this.countSurroundingMines(col, row);
            });
        });
    };
    Model.prototype.getMinefield = function () {
        return this.field;
    };
    Model.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map