"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
var react_1 = require("react");
var Board_1 = require("./Board");
var cols = 10;
var rows = 10;
var factor = 0.1;
var isFirstClick = true;
function Game() {
    var initial = [];
    for (var i = 0; i < rows * cols; i++) {
        initial.push({
            id: i,
            open: false,
            mine: false,
            count: 0,
            flagged: false,
            highlighted: false,
        });
    }
    var _a = (0, react_1.useState)(initial), state = _a[0], setState = _a[1];
    var numMines = 10;
    function handleClick(i, context) {
        var nextstate = state.slice();
        if (isFirstClick) {
            isFirstClick = false;
            nextstate = initMineField(nextstate, i);
        }
        if (context)
            nextstate[i].flagged = !nextstate[i].flagged;
        else {
            var isMine = setAsOpen(i, nextstate);
            if (isMine) {
                alert("You bombed out!");
            }
            else {
                var numClosedCells = state.reduce(function (count, cell) { return count + (cell.open ? 0 : 1); }, 0);
                if (numMines === numClosedCells) {
                    alert("Congrats, you won!");
                }
            }
        }
        setState(nextstate);
    }
    return (<>
      <h1>Mineswept, the game</h1>
      <Board_1.Board cols={cols} rows={rows} state={state} handleClick={handleClick}/>
      
    </>);
}
function initMineField(state, clickedIndex) {
    var numMines = Math.floor(cols * rows * factor);
    var initialClick = getCoordinates(clickedIndex);
    var newState = state.slice();
    var max = 1000;
    while (numMines > 0 && max--) {
        var col = getRandomInt(cols);
        var row = getRandomInt(rows);
        if (col >= initialClick.col - 1 &&
            col <= initialClick.col + 1 &&
            row >= initialClick.row - 1 &&
            row <= initialClick.row + 1) {
            continue;
        }
        var cell = getCell(col, row, state);
        if (!cell.mine) {
            cell.mine = true;
            numMines--;
        }
    }
    newState.forEach(function (cell, index) {
        return (cell.count = countSurroundingMines(index % cols, Math.floor(index / rows), state));
    });
    return newState;
}
function setAsOpen(index, state) {
    var cell = state[index];
    if (cell.mine)
        return true;
    if (cell.open)
        return false;
    cell.open = true;
    if (cell.count === 0) {
        var coord = getCoordinates(index);
        var cells = getSurroundingCells(coord.col, coord.row, state);
        cells.forEach(function (c, i) { return setAsOpen(getCell(c.col, c.row, state).id, state); });
    }
    return false;
}
function getCoordinates(index) {
    return { col: index % cols, row: Math.floor(index / rows) };
}
function getCell(col, row, state) {
    return state[col + row * cols];
}
function countSurroundingMines(col, row, state) {
    var countedMines = 0;
    var cells = getSurroundingCells(col, row, state);
    cells.forEach(function (c) {
        var cell = getCell(c.col, c.row, state);
        if (!cell)
            console.log("no cell!", c.col, c.row);
        if (cell.mine)
            countedMines++;
    });
    return countedMines;
}
function getSurroundingCells(col, row, state) {
    var coords = [];
    if (col < 0 || row < 0 || col >= cols || row >= rows)
        return coords;
    var atTop = row === 0;
    var atBottom = row === rows - 1;
    var atLeft = col === 0;
    var atRight = col === cols - 1;
    function addRow(delta) {
        if (!atLeft)
            coords.push({ col: col - 1, row: row + delta });
        coords.push({ col: col, row: row + delta });
        if (!atRight)
            coords.push({ col: col + 1, row: row + delta });
    }
    if (!atTop)
        addRow(-1);
    addRow(0);
    if (!atBottom)
        addRow(1);
    return coords;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//# sourceMappingURL=App.js.map