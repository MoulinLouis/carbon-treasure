import { LoggerUtils } from "../utils/loggerUtils";
import { Adventurer } from "./adventurer";
import { Cell, CellType } from "./cell";
import { Mountain } from "./moutain";
import { Treasure } from "./treasure";

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

    LoggerUtils.write(`Area of size ${width}x${height} created.`);
  }

  displayMap(): void {
    let mapString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        switch (this.grid[i][j].type) {
          case CellType.PLAIN:
            mapString += " . ";
            break;
          case CellType.MOUNTAIN:
            mapString += " M ";
            break;
          case CellType.TREASURE:
            mapString += " T ";
            break;
          default:
            mapString += " ? ";
        }
        if(this.grid[i][j].occupant) {
          mapString += " A (" + this.grid[i][j].occupant?.name + ")";
        }
      }
      mapString += "\n";
    }
    console.log(mapString);
  }

  addMountain(x: number, y: number): void {
    if (!this.isCellEmpty(x, y)) {
      LoggerUtils.write(
        `There is already a treasure or mountain at position (${x}, ${y}).`
      );
      return;
    }
    this.grid[y][x].type = CellType.MOUNTAIN;
    this.grid[y][x].content = new Mountain();
  }

  addTreasure(x: number, y: number, amount: number): void {
    if (!this.isCellEmpty(x, y)) {
      LoggerUtils.write(
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

  isCellValid(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  moveAdventurer(adventurer: Adventurer, newX: number, newY: number): void {
    const oldX = adventurer.horizontalPosition;
    const oldY = adventurer.verticalPosition;

    if (!this.grid[newY][newX].occupant) {
      if (this.grid[newY][newX].type !== CellType.MOUNTAIN) {
        adventurer.horizontalPosition = newX;
        adventurer.verticalPosition = newY;

        this.grid[oldY][oldX].occupant = null;
        this.grid[newY][newX].occupant = adventurer;

        LoggerUtils.write(
          `Adventurer ${adventurer.name} moved forward in direction ${adventurer.orientation} and is now at (${newX}, ${newY}).`
        );
        if (this.grid[newY][newX].type === CellType.TREASURE) {
          const treasure = this.grid[newY][newX].content as Treasure;
          treasure.amount--;
          adventurer.treasuresCollected++;

          LoggerUtils.write(
            `Adventurer ${adventurer.name} encountered a treasure at (${newX}, ${newY}) and now has ${adventurer.treasuresCollected} treasures.`
          );
          if (treasure.amount === 0) {
            this.grid[newY][newX].type = CellType.PLAIN;
            this.grid[newY][newX].content = null;
          }
        }
      } else {
        LoggerUtils.write(
          `Adventurer ${adventurer.name} tried to move forward in direction ${adventurer.orientation} but there was a mountain (${newX}, ${newY}) in the way.`
        );
      }
    } else {
      LoggerUtils.write(
        `Adventurer ${adventurer.name} tried to move forward in direction ${adventurer.orientation} but there was another adventurer (${newX}, ${newY}) in the way.`
      );
    }
  }
}
