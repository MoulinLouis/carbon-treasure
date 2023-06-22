import { Mountain } from "../src/models/moutain";

describe("Mountain", () => {
  it("should create a mountain", () => {
    const mountain = new Mountain();
    expect(mountain).toBeInstanceOf(Mountain);
  });
});
