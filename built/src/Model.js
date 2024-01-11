"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = (function () {
    function Model(cols, rows) {
        this.cells = [];
        this.cols = cols;
        this.rows = rows;
        var numCells = cols * rows;
        while (numCells--) {
            this.cells.push({
                mine: false,
                count: 0,
                open: false,
                flagged: false,
                highlighted: false,
            });
        }
    }
    Model.prototype.getCell = function (col, row) {
        return this.cells[col + row * this.cols];
    };
    Model.prototype.getSurroundingCells = function (col, row) {
        var coord = [];
        if (col < 0 || row < 0 || col >= this.cols || row >= this.rows)
            return coord;
        var atTop = row === 0;
        var atBottom = row === this.rows - 1;
        var atLeft = col === 0;
        var atRight = col === this.cols - 1;
        function addRow(delta) {
            if (!atLeft)
                coord.push({ col: col - 1, row: row + delta });
            coord.push({ col: col, row: row + delta });
            if (!atRight)
                coord.push({ col: col + 1, row: row + delta });
        }
        if (!atTop)
            addRow(-1);
        addRow(0);
        if (!atBottom)
            addRow(1);
        return coord;
    };
    Model.prototype.toggleFlagged = function (col, row, state) {
        var cell = this.getCell(col, row);
        if (!cell.open)
            cell.flagged = state !== undefined ? state : !cell.flagged;
    };
    Model.prototype.setAsOpen = function (col, row) {
        var _this = this;
        var cell = this.getCell(col, row);
        if (cell.mine)
            return true;
        if (cell.open)
            return false;
        cell.open = true;
        if (cell.count === 0) {
            var cells = this.getSurroundingCells(col, row);
            cells.forEach(function (c) { return _this.setAsOpen(c.col, c.row); });
        }
        return false;
    };
    Model.prototype.countSurroundingMines = function (col, row) {
        var _this = this;
        var countedMines = 0;
        var cells = this.getSurroundingCells(col, row);
        cells.forEach(function (c) {
            var cell = _this.getCell(c.col, c.row);
            if (!cell)
                console.log("no cell!", c.col, c.row);
            if (cell.mine)
                countedMines++;
        });
        return countedMines;
    };
    Object.defineProperty(Model.prototype, "numMines", {
        get: function () {
            return this._numMines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "numClosedCells", {
        get: function () {
            return this.cells.reduce(function (p, cell) { return (cell.open ? 0 : 1) + p; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype.distributeMines = function (initialClick, factor) {
        var _this = this;
        if (factor === void 0) { factor = 0.1; }
        var cols = this.cols;
        var rows = this.rows;
        var numMines = (this._numMines = Math.floor(cols * rows * factor));
        while (numMines > 0) {
            var col = this.getRandomInt(cols);
            var row = this.getRandomInt(rows);
            if (col >= initialClick.col - 1 &&
                col <= initialClick.col + 1 &&
                row >= initialClick.row - 1 &&
                row <= initialClick.row + 1) {
                continue;
            }
            var cell = this.getCell(col, row);
            if (!cell.mine) {
                cell.mine = true;
                numMines--;
            }
        }
        this.cells.forEach(function (cell, index) {
            return (cell.count = _this.countSurroundingMines(index % cols, Math.floor(index / rows)));
        });
    };
    Model.prototype.getMinefield = function () {
        return { cols: this.cols, rows: this.rows, cells: this.cells };
    };
    Model.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map