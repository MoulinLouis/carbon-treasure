export class Adventurer {
  constructor(
    public name: string,
    public x: number,
    public y: number,
    public orientation: string,
    public movementSequence: string,
    public treasuresCollected: number = 0
  ) {}

  moveForward(): void {
    if (this.orientation === "N") {
      this.y--;
    } else if (this.orientation === "E") {
      this.x++;
    } else if (this.orientation === "S") {
      this.y++;
    } else if (this.orientation === "W") {
      this.x--;
    }
  }

  turnLeft(): void {
    const orientations = ["N", "W", "S", "E"];
    const currentIndex = orientations.indexOf(this.orientation);
    this.orientation = orientations[(currentIndex + 3) % 4];
  }

  turnRight(): void {
    const orientations = ["N", "E", "S", "W"];
    const currentIndex = orientations.indexOf(this.orientation);
    this.orientation = orientations[(currentIndex + 1) % 4];
  }

  executeMovementSequence(): void {
    for (const movement of this.movementSequence) {
      if (movement === "A") {
        this.moveForward();
      } else if (movement === "G") {
        this.turnLeft();
      } else if (movement === "D") {
        this.turnRight();
      }
    }
  }
}
