import { Adventurer } from "../models/adventurer";
import { Area } from "../models/area";
import { Mountain } from "../models/moutain";
import { Treasure } from "../models/treasure";

export class ParserUtils {
  public static parseInputData(inputData: string): {
    area: Area;
    adventurers: Adventurer[];
  } {
    const lines = inputData.split("\n");

    let area: Area | null = null;
    const adventurers: Adventurer[] = [];

    lines.forEach((line) => {
      const parts = line.split(" - ");

      switch (parts[0]) {
        case "C":
          area = new Area(parseInt(parts[1]), parseInt(parts[2]));
          break;
        case "M":
          area?.addMountain(parseInt(parts[1]), parseInt(parts[2]));
          break;
        case "T":
          area?.addTreasure(
            parseInt(parts[1]),
            parseInt(parts[2]),
            parseInt(parts[3])
          );
          break;
        case "A":
          const adventurer = new Adventurer(
            parts[1],
            parseInt(parts[2]),
            parseInt(parts[3]),
            parts[4],
            parts[5],
            0,
            area
          );
          adventurers.push(adventurer);
          break;
        default:
          console.log(`Unrecognized line: ${line}`);
      }
    });

    if (!area) {
      throw new Error("Area data missing in input data");
    }

    return { area, adventurers };
  }

  static formatOutputData(area: Area, adventurers: Adventurer[]): string {
    let outputData = `C - ${area.width} - ${area.height}\n`;

    area.grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === "MOUNTAIN") {
          outputData += `M - ${cell.y} - ${cell.x}\n`;
        }
        if (
          cell.type === "TREASURE" &&
          cell.content !== null &&
          cell.content instanceof Treasure
        ) {
          outputData += `T - ${cell.y} - ${cell.x} - ${cell.content.amount}\n`;
        }
      });
    });

    adventurers.forEach((adventurer) => {
      outputData += `A - ${adventurer.name} - ${adventurer.horizontalPosition} - ${adventurer.verticalPosition} - ${adventurer.orientation} - ${adventurer.treasuresCollected}\n`;
    });

    return outputData;
  }
}
