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

  /**
   * Displays the area as a string.
   * @returns A string representation the area.
   */
  displayMap(): string {
    let mapString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        switch (this.grid[i][j].type) {
          case CellType.PLAIN:
            if (this.grid[i][j].occupant) {
              mapString += " A(" + this.grid[i][j].occupant?.name + ")";
            } else {
              mapString += " . ";
            }
            break;
          case CellType.MOUNTAIN:
            mapString += " M ";
            break;
          case CellType.TREASURE:
            if (this.grid[i][j].occupant) {
              mapString += " A(" + this.grid[i][j].occupant?.name + ")";
            } else {
              const treasure = this.grid[i][j].content as Treasure;
              mapString += ` T(${treasure.amount}) `;
            }
            break;
          default:
            mapString += " ? ";
        }
      }
      mapString += "\n";
    }
    return mapString;
  }

  /**
   * Adds a mountain to the area.
   * @param x The horizontal position of the mountain.
   * @param y The vertical position of the mountain.
   */
  addMountain(x: number, y: number): void {
    if (!this.isCellValid(x, y)) {
      throw new Error(`Mountain position (${x}, ${y}) is outside of the area.`);
    }
    if (!this.isCellEmpty(x, y)) {
      throw new Error(
        `There is already a treasure or mountain at position (${x}, ${y}).`
      );
    }

    this.grid[y][x].type = CellType.MOUNTAIN;
    this.grid[y][x].content = new Mountain();
  }

  /**
   * Adds a treasure to the area.
   * @param x The horizontal position of the treasure.
   * @param y The vertical position of the treasure.
   * @param amount The amount of treasures in the treasure.
   */
  addTreasure(x: number, y: number, amount: number): void {
    if (!this.isCellValid(x, y)) {
      throw new Error(`Treasure position (${x}, ${y}) is outside of the area.`);
    }
    if (!this.isCellEmpty(x, y)) {
      throw new Error(
        `There is already a treasure or mountain at position (${x}, ${y}).`
      );
    }
    if (amount <= 0) {
      throw new Error(`Treasure amount must be positive.`);
    }
    this.grid[y][x].type = CellType.TREASURE;
    this.grid[y][x].content = new Treasure(amount);
  }

  /**
   * Checks if a cell is empty.
   * @param x The horizontal position of the cell.
   * @param y The vertical position of the cell.
   * @returns True if the cell is empty, false otherwise.
   */
  isCellEmpty(x: number, y: number): boolean {
    return this.grid[y][x].type === CellType.PLAIN;
  }

  /**
   * Checks if a cell is valid.
   * @param x The horizontal position of the cell.
   * @param y The vertical position of the cell.
   * @returns True if the cell is valid, false otherwise.
   */
  isCellValid(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Moves an adventurer to a new cell.
   * @param adventurer The adventurer to move.
   * @param newX The horizontal position of the new cell.
   * @param newY The vertical position of the new cell.
   */
  moveAdventurer(adventurer: Adventurer, newX: number, newY: number): void {
    const oldX = adventurer.horizontalPosition;
    const oldY = adventurer.verticalPosition;

    if (!this.grid[newY][newX].occupant) {
      if (this.grid[newY][newX].type !== CellType.MOUNTAIN) {
        adventurer.moveForward();

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
