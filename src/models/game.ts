import { FileUtils } from "../utils/fileUtills";
import { ParserUtils } from "../utils/parserUtils";
import { Adventurer } from "./adventurer";
import { Area } from "./area";

export class Game {
  private inputFilePath: string;
  private outputFilePath: string;
  private area!: Area;
  private adventurers: Adventurer[] = [];

  constructor(inputFilePath: string, outputFilePath: string) {
    this.inputFilePath = inputFilePath;
    this.outputFilePath = outputFilePath;
  }

  /**
   * Initializes the game by reading the input file and parsing the data.
   */
  init() {
    console.log(`Reading file from path ${this.inputFilePath}`);

    try {
      const inputData = FileUtils.readFile(this.inputFilePath);

      // Parse the input data
      const { area, adventurers } = ParserUtils.parseInputData(inputData);
      this.area = area;
      this.adventurers = adventurers;

      // Show the map in the console
      console.log("Displaying base map:");
      console.log(this.area.displayMap());
    } catch (err) {
      console.error(`Unexpected error during initialization: ${err}`);
    }
  }

  /**
   * Runs the game.
   */
  run() {
    try {
      // Execute the movements of each adventurer
      const movementSequences = this.adventurers.map((adventurer) =>
        adventurer.executeMovementSequence()
      );
      let doneCount = 0;

      while (doneCount < this.adventurers.length) {
        for (let i = 0; i < movementSequences.length; i++) {
          const { done } = movementSequences[i].next();
          if (done) {
            doneCount++;
            movementSequences.splice(i, 1);
            i--;
          }
        }
      }

      console.log("Displaying actual map:");
      console.log(this.area.displayMap());

      this.adventurers.forEach((adventurer) => {
        console.log(
          `Adventurer ${adventurer.name} collected ${adventurer.treasuresCollected} treasures.`
        );
      });
    } catch (err) {
      console.error(`Unexpected error during execution: ${err}`);
    }
  }

  /**
   * Saves the results of the game to the output file.
   */
  saveResults() {
    try {
      // Format output data
      const outputData = ParserUtils.formatOutputData(
        this.area,
        this.adventurers
      );

      // Write the formatted result to the output file
      FileUtils.writeFile(this.outputFilePath, outputData);

      console.log(`Successfully wrote output file: ${this.outputFilePath}`);
    } catch (err) {
      console.error(`Unexpected error during result saving: ${err}`);
    }
  }
}
