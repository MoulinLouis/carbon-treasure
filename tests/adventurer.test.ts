import { Adventurer } from "../src/models/adventurer";
import { Area } from "../src/models/area";
import { Treasure } from "../src/models/treasure";

function executeMovementIterator(
  movementSequenceIterator: IterableIterator<void>
) {
  while (true) {
    const { done } = movementSequenceIterator.next();
    if (done) break;
  }
}

describe("Adventurer", () => {
  let area: Area;
  let adventurer: Adventurer;

  beforeEach(() => {
    area = new Area(3, 3);
  });

  it("should move adventurer according to the movement sequence", async () => {
    adventurer = new Adventurer("Indiana", 0, 0, "S", "AADADAGGA", 0, area);

    const movementSequenceIterator = adventurer.executeMovementSequence();

    executeMovementIterator(movementSequenceIterator);

    expect(adventurer.horizontalPosition).toBe(0);
    expect(adventurer.verticalPosition).toBe(2);
    expect(adventurer.orientation).toBe("S");
  });

  it("should collect treasure when moving to a cell containing treasure", () => {
    adventurer = new Adventurer("Indiana", 0, 0, "S", "AADADAGGA", 0, area);

    area.addTreasure(0, 1, 1);

    if (
      area.grid[1][0].content &&
      area.grid[1][0].content instanceof Treasure
    ) {
      expect(area.grid[1][0].content.amount).toBe(1);
    } else {
      throw new Error("There should be a treasure in this cell.");
    }

    const movementSequenceIterator = adventurer.executeMovementSequence();

    executeMovementIterator(movementSequenceIterator);

    expect(adventurer.treasuresCollected).toBe(1);
  });

  it("should not move to a cell containing a mountain", () => {
    adventurer = new Adventurer("Indiana", 0, 0, "S", "AA", 0, area);
    area.addMountain(0, 2);

    const movementSequenceIterator = adventurer.executeMovementSequence();

    executeMovementIterator(movementSequenceIterator);

    expect(adventurer.horizontalPosition).toBe(0);
    expect(adventurer.verticalPosition).toBe(1);
  });

  it("should not execute invalid movement", () => {
    adventurer = new Adventurer("Indiana", 1, 1, "N", "Z", 0, area);

    const movementSequenceIterator = adventurer.executeMovementSequence();

    executeMovementIterator(movementSequenceIterator);

    expect(adventurer.horizontalPosition).toBe(1);
    expect(adventurer.verticalPosition).toBe(1);
    expect(adventurer.orientation).toBe("N");
  });

  it("should not create adventurer outside of the area", () => {
    expect(() => {
      adventurer = new Adventurer("Indiana", 3, 3, "N", "A", 0, area);
    }).toThrowError("Invalid adventurer position (3, 3) for area of size 3x3.");
  });

  it("should not create adventurer on a cell already occupied", () => {
    adventurer = new Adventurer("Indiana", 1, 1, "N", "A", 0, area);
    expect(() => {
      adventurer = new Adventurer("Indiana", 1, 1, "N", "A", 0, area);
    }).toThrowError("Cell at position (1, 1) is already occupied by Indiana.");
  });

  it("should not move adventurer on a cell already occupied", () => {
    adventurer = new Adventurer("Indiana", 1, 1, "N", "A", 0, area);
    const adventurer2 = new Adventurer("Lara", 1, 0, "N", "A", 0, area);
    
    const movementSequenceIterator = adventurer.executeMovementSequence();

    executeMovementIterator(movementSequenceIterator);

    expect(adventurer.horizontalPosition).toBe(1);
    expect(adventurer.verticalPosition).toBe(1);
    expect(adventurer2.horizontalPosition).toBe(1);
    expect(adventurer2.verticalPosition).toBe(0);
  });
});
