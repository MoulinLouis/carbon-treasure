import { Logger } from "../utils/Logger";
import { Adventurer } from "./Adventurer";
import { Cell, CellType } from "./Cell";
import { Mountain } from "./Moutain";
import { Treasure } from "./Treasure";

export class Area {
  public grid: Cell[][];

  constructor(public width: number, public height: number) {
    this.grid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(null));
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.grid[i][j] = new Cell(i, j);
      }
    }

    Logger.log(`Area of size ${width}x${height} created.`);
  }

  displayMap(): void {
    let mapString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        switch (this.grid[i][j].type) {
          case CellType.PLAIN:
            mapString += ".";
            break;
          case CellType.MOUNTAIN:
            mapString += "M";
            break;
          case CellType.TREASURE:
            mapString += "T";
            break;
          default:
            mapString += "?";
        }
      }
      mapString += "\n";
    }
    console.log(mapString);
  }

  addMountain(x: number, y: number): void {
    if (!this.isCellEmpty(x, y)) {
      Logger.log(
        `There is already a treasure or mountain at position (${x}, ${y}).`
      );
      return;
    }
    this.grid[y][x].type = CellType.MOUNTAIN;
    this.grid[y][x].content = new Mountain();
  }

  addTreasure(x: number, y: number, amount: number): void {
    if (!this.isCellEmpty(x, y)) {
      Logger.log(
        `There is already a treasure or mountain at position (${x}, ${y}).`
      );
      return;
    }
    this.grid[y][x].type = CellType.TREASURE;
    this.grid[y][x].content = new Treasure(amount);
  }

  isCellEmpty(x: number, y: number): boolean {
    return this.grid[y][x].type === CellType.PLAIN;
  }

  moveAdventurer(adventurer: Adventurer, newX: number, newY: number): void {
    if (this.grid[newY][newX].type !== CellType.MOUNTAIN) {
      adventurer.horizontalPosition = newX;
      adventurer.verticalPosition = newY;

      Logger.log(
        `Adventurer ${adventurer.name} moved forward in direction ${adventurer.orientation} and is now at (${newX}, ${newY}).`
      );
      if (this.grid[newY][newX].type === CellType.TREASURE) {
        const treasure = this.grid[newY][newX].content as Treasure;
        treasure.amount--;
        adventurer.treasuresCollected++;

        Logger.log(
          `Adventurer ${adventurer.name} encountered a treasure at (${newX}, ${newY}) and now has ${adventurer.treasuresCollected} treasures.`
        );
        if (treasure.amount === 0) {
          this.grid[newY][newX].type = CellType.PLAIN;
          this.grid[newY][newX].content = null;
        }
      }
    } else {
      Logger.log(
        `Adventurer ${adventurer.name} tried to move forward in direction ${adventurer.orientation} but there was a mountain (${newX}, ${newY}) in the way.`
      );
    }
  }
}
