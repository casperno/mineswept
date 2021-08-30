import { Model } from "../src/Model";

it("can create a minefield of given size", () => {
  // given
  const model = new Model();
  model.distributeMines({ col: 10, row: 10 }, 20, 15);

  //when
  const minefield = model.getMinefield();

  // then
  expect(minefield.length).toEqual(20);
  expect(minefield[0].length).toEqual(15);
});
