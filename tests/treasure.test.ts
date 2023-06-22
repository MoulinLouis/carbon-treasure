import { Treasure } from "../src/models/treasure";

describe("Treasure", () => {
  it("should create a treasure with specified values", () => {
    const treasure = new Treasure(5);
    expect(treasure.amount).toBe(5);
  });

  it("should decrease the amount of treasure", () => {
    const treasure = new Treasure(5);
    treasure.decrease();
    expect(treasure.amount).toBe(4);
  });
});
