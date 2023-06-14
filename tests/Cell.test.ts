import { Cell, CellType } from "../src/models/Cell";
import { Mountain } from "../src/models/Moutain";
import { Treasure } from "../src/models/Treasure";

describe("Cell", () => {
  it("should create a cell with default values", () => {
    const cell = new Cell(0, 0);
    expect(cell.x).toBe(0);
    expect(cell.y).toBe(0);
    expect(cell.type).toBe(CellType.PLAIN);
    expect(cell.content).toBeNull();
  });

  it("should create a cell with specified values", () => {
    const mountain = new Mountain();
    const cell = new Cell(2, 3, CellType.MOUNTAIN, mountain);
    expect(cell.x).toBe(2);
    expect(cell.y).toBe(3);
    expect(cell.type).toBe(CellType.MOUNTAIN);
    expect(cell.content).toBe(mountain);
  });

  it("should default to plain type and null content", () => {
    const cell = new Cell(1, 1);
    expect(cell.type).toBe(CellType.PLAIN);
    expect(cell.content).toBeNull();
  });

  it("should allow updating the type and content", () => {
    const treasure = new Treasure(5);
    const cell = new Cell(0, 0);
    cell.type = CellType.TREASURE;
    cell.content = treasure;
    expect(cell.type).toBe(CellType.TREASURE);
    expect(cell.content).toBe(treasure);
  });
});
