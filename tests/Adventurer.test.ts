import { Adventurer } from "../src/models/Adventurer";

describe("Adventurer", () => {
  it("should move forward correctly", () => {
    const adventurer = new Adventurer("Indiana", 0, 0, "N", "A");
    adventurer.moveForward();
    expect(adventurer.y).toBe(-1);
  });
});
