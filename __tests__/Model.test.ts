import { Model } from "../src/Model";

it("can create a minefield", () => {
  // given
  const model = new Model();
  model.distributeMines({ col: 10, row: 10 }, 20, 20);

  //when
  const minefield = model.getMinefield();

  // then
  expect(minefield.length).toEqual(20);
});
