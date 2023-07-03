"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../src/Model");
it("can create a minefield of given size", function () {
    var model = new Model_1.Model(20, 15);
    var minefield = model.getMinefield();
    expect(minefield.cells.length).toEqual(20 * 15);
});
it("can get a cell in minefied, but not outside", function () {
    var model = new Model_1.Model(20, 15);
    expect(model.getCell(0, 0)).toBeTruthy();
    expect(model.getCell(19, 0)).toBeTruthy();
    expect(model.getCell(19, 14)).toBeTruthy();
    expect(model.getCell(0, 14)).toBeTruthy();
    expect(model.getCell(0, 15)).toBeFalsy();
    expect(model.getCell(20, 15)).toBeFalsy();
});
it("can get surrounding cells", function () {
    var model = new Model_1.Model(10, 15);
    expect(model.getSurroundingCells(0, 0).length).toEqual(4);
    expect(model.getSurroundingCells(1, 1).length).toEqual(9);
    expect(model.getSurroundingCells(9, 0).length).toEqual(4);
    expect(model.getSurroundingCells(9, 14).length).toEqual(4);
    expect(model.getSurroundingCells(0, 14).length).toEqual(4);
    expect(model.getSurroundingCells(5, 14).length).toEqual(6);
    expect(model.getSurroundingCells(15, 15).length).toEqual(0);
});
//# sourceMappingURL=Model.test.js.map