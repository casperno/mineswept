"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = Board;
function Board(_a) {
    var cols = _a.cols, rows = _a.rows, state = _a.state, handleClick = _a.handleClick;
    var demoMode = false;
    return (<div className="board-grid" key="board$4" style={{ gridTemplateColumns: "repeat(".concat(cols, ", 30px)") }}>
      {state.map(function (s, i) { return (<Cell key={s.id} state={s} onSquareClick={function (e) {
                e.preventDefault();
                handleClick(i, false);
            }} onContextMenu={function (e) {
                e.preventDefault();
                handleClick(i, true);
            }}></Cell>); })}
    </div>);
}
function generateBoard(cols, rows) { }
function Cell(_a) {
    var state = _a.state, onSquareClick = _a.onSquareClick, onContextMenu = _a.onContextMenu;
    var cssClass = ["cell"];
    if (state.flagged)
        cssClass.push("icon-flag");
    if (state.open)
        cssClass.push("open");
    if (state.highlighted)
        cssClass.push("highlight");
    return (<button className={cssClass.join(" ")} onClick={onSquareClick} onContextMenu={onContextMenu}>
      {state.count > 0 && !state.mine && state.open ? (<span className="count">{state.count}</span>) : ("")}
    </button>);
}
//# sourceMappingURL=Board.js.map