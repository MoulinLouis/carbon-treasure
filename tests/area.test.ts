import { Adventurer } from "../src/models/adventurer";
import { Area } from "../src/models/area";
import { CellType } from "../src/models/cell";
import { Mountain } from "../src/models/moutain";
import { Treasure } from "../src/models/treasure";

describe("Area", () => {
  let area: Area;

  beforeEach(() => {
    area = new Area(5, 5);
  });

  it("should initialize an empty grid", () => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        expect(area.grid[i][j].type).toBe(CellType.PLAIN);
        expect(area.grid[i][j].content).toBeNull();
      }
    }
  });

  it("should add a mountain to the grid", () => {
    area.addMountain(2, 2);
    expect(area.grid[2][2].type).toBe(CellType.MOUNTAIN);
    expect(area.grid[2][2].content).toBeInstanceOf(Mountain);
  });

  it("should throw an error when adding a mountain outside of the area", () => {
    expect(() => area.addMountain(5, 5)).toThrow(
      new Error("Mountain position (5, 5) is outside of the area.")
    );
  });

  it("should throw an error when adding a mountain on a cell that is not empty", () => {
    area.addMountain(2, 2);
    expect(() => area.addMountain(2, 2)).toThrow(
      new Error("There is already a treasure or mountain at position (2, 2).")
    );
  });

  it("should add a treasure to the grid", () => {
    area.addTreasure(3, 3, 5);
    expect(area.grid[3][3].type).toBe(CellType.TREASURE);
    expect(area.grid[3][3].content).toBeInstanceOf(Treasure);
    if (area.grid[3][3].content instanceof Treasure) {
      expect(area.grid[3][3].content.amount).toBe(5);
    }
  });

  it("should throw an error when adding a treasure outside of the area", () => {
    expect(() => area.addTreasure(5, 5, 5)).toThrow(
      new Error("Treasure position (5, 5) is outside of the area.")
    );
  });

  it("should throw an error when adding a treasure on a cell that is not empty", () => {
    area.addTreasure(3, 3, 5);
    expect(() => area.addTreasure(3, 3, 5)).toThrow(
      new Error("There is already a treasure or mountain at position (3, 3).")
    );
  });

  it("should throw an error when adding a treasure with a negative amount", () => {
    expect(() => area.addTreasure(3, 3, -5)).toThrow(
      new Error("Treasure amount must be positive.")
    );
  });
  
  it("should display the grid", () => {
    area.addTreasure(0, 0, 1);
    area.addMountain(1, 1);
    area.addTreasure(2, 2, 5);
    area.addTreasure(3, 3, 3);
    area.addTreasure(4, 4, 1);
    const adventurer = new Adventurer("Indiana", 2, 2, "S", "", 0, area);

    const expectedMap =
      " T(1)  .  .  .  . \n" +
      " .  M  .  .  . \n" +
      " .  .  T(5)  A(Indiana) .  . \n" +
      " .  .  .  T(3)  . \n" +
      " .  .  .  .  T(1) \n";

    expect(area.displayMap()).toBe(expectedMap);
  });
});
