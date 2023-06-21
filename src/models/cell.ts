import { Adventurer } from "./adventurer";
import { Mountain } from "./moutain";
import { Treasure } from "./treasure";

export enum CellType {
  PLAIN = "PLAIN",
  MOUNTAIN = "MOUNTAIN",
  TREASURE = "TREASURE",
}

export class Cell {
  occupant: Adventurer | null = null;

  constructor(
    public x: number,
    public y: number,
    public type: CellType = CellType.PLAIN,
    public content: Mountain | Treasure | null = null
  ) {}
}
