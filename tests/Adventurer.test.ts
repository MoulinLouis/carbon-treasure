import { Adventurer } from "../src/models/Adventurer";

describe("Adventurer", () => {
  it("should move forward correctly", () => {
    const adventurer = new Adventurer("Indiana", 0, 0, "N", "A");
    adventurer.moveForward();
    expect(adventurer.verticalPosition).toBe(-1);
  });

  it("should move forward correctly when facing different directions", () => {
    // Tester le déplacement vers le Nord
    let adventurer = new Adventurer("Indiana", 0, 0, "N", "A");
    adventurer.moveForward();
    expect(adventurer.verticalPosition).toBe(-1);

    // Tester le déplacement vers l'Est
    adventurer = new Adventurer("Indiana", 0, 0, "E", "A");
    adventurer.moveForward();
    expect(adventurer.horizontalPosition).toBe(1);

    // Tester le déplacement vers le Sud
    adventurer = new Adventurer("Indiana", 0, 0, "S", "A");
    adventurer.moveForward();
    expect(adventurer.verticalPosition).toBe(1);

    // Tester le déplacement vers l'Ouest
    adventurer = new Adventurer("Indiana", 0, 0, "W", "A");
    adventurer.moveForward();
    expect(adventurer.horizontalPosition).toBe(-1);
  });

  it("should turn left correctly", () => {
    const adventurer = new Adventurer("Indiana", 0, 0, "N", "A");
    adventurer.turnLeft();
    expect(adventurer.orientation).toBe("W");
  });

  it("should turn right correctly", () => {
    const adventurer = new Adventurer("Indiana", 0, 0, "N", "A");
    adventurer.turnRight();
    expect(adventurer.orientation).toBe("E");
  });
});
