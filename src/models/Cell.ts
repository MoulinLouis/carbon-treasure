import { Mountain } from "./Moutain";
import { Treasure } from "./Treasure";

export enum CellType {
  PLAIN = "PLAIN",
  MOUNTAIN = "MOUNTAIN",
  TREASURE = "TREASURE",
}

export class Cell {
  constructor(
    public x: number,
    public y: number,
    public type: CellType = CellType.PLAIN,
    public content: Mountain | Treasure | null = null
  ) {}
}
