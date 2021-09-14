import { Model } from "../src/Model";

it("can create a minefield of given size", () => {
  // given
  const model = new Model(20, 15);

  // when
  const minefield = model.getMinefield();

  // then
  expect(minefield.cells.length).toEqual(20 * 15);
});

it("can get a cell in minefied, but not outside", () => {
  // given
  const model = new Model(20, 15);

  // when then
  expect(model.getCell(0, 0)).toBeTruthy();
  expect(model.getCell(19, 0)).toBeTruthy();
  expect(model.getCell(19, 14)).toBeTruthy();
  expect(model.getCell(0, 14)).toBeTruthy();
  expect(model.getCell(0, 15)).toBeFalsy();
  expect(model.getCell(20, 15)).toBeFalsy();
});

it("can get surrounding cells", () => {
  // given
  const model = new Model(10, 15);

  // when then
  expect(model.getSurroundingCells(0, 0).length).toEqual(4);
  expect(model.getSurroundingCells(1, 1).length).toEqual(9);
  expect(model.getSurroundingCells(9, 0).length).toEqual(4);
  expect(model.getSurroundingCells(9, 14).length).toEqual(4);
  expect(model.getSurroundingCells(0, 14).length).toEqual(4);
  expect(model.getSurroundingCells(5, 14).length).toEqual(6);
  expect(model.getSurroundingCells(15, 15).length).toEqual(0);
});
