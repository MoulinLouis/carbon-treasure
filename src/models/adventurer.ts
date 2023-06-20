import { LoggerUtils } from "../utils/loggerUtils";
import { Area } from "./area";

export class Adventurer {
  constructor(
    public name: string,
    public horizontalPosition: number,
    public verticalPosition: number,
    public orientation: string,
    public movementSequence: string,
    public treasuresCollected: number = 0,
    public area?: Area | null
  ) {
    LoggerUtils.write(
      `Adventurer ${name} created at (${horizontalPosition}, ${verticalPosition}) facing ${orientation}.`
    );
  }

  moveForward(): void {
    if (this.orientation === "N") {
      this.verticalPosition--;
    } else if (this.orientation === "E") {
      this.horizontalPosition++;
    } else if (this.orientation === "S") {
      this.verticalPosition++;
    } else if (this.orientation === "W") {
      this.horizontalPosition--;
    }
  }

  turnLeft(): void {
    const orientations = ["N", "W", "S", "E"];
    const currentIndex = orientations.indexOf(this.orientation);
    this.orientation = orientations[(currentIndex + 1) % 4];
  }

  turnRight(): void {
    const orientations = ["N", "E", "S", "W"];
    const currentIndex = orientations.indexOf(this.orientation);
    this.orientation = orientations[(currentIndex + 1) % 4];
  }

  changeOrientation(movement: string): void {
    if (movement === "D") {
      this.turnRight();
    } else if (movement === "G") {
      this.turnLeft();
    }
  }

  executeMovementSequence(): void {
    for (const movement of this.movementSequence) {
      if (movement === "A") {
        const { horizontalPosition: x, verticalPosition: y } = this;
        let newX = x;
        let newY = y;

        if (this.orientation === "N") {
          newY--;
        } else if (this.orientation === "E") {
          newX++;
        } else if (this.orientation === "S") {
          newY++;
        } else if (this.orientation === "W") {
          newX--;
        }
        if (newX >= 0 && newY >= 0 && this.area) {
          this.area.moveAdventurer(this, newX, newY);
        } else {
          LoggerUtils.write(
            `Adventurer ${this.name} tried to move outside the area and is still at (${x}, ${y}).`
          );
        }
      } else if (movement === "D" || movement === "G") {
        this.changeOrientation(movement);

        LoggerUtils.write(
          `Adventurer ${this.name} turned ${
            movement === "D" ? "right" : "left"
          } and is now facing ${this.orientation}.`
        );
      }
    }
  }
}
