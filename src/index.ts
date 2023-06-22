import { ParserUtils } from "./utils/parserUtils";
import { FileUtils } from "./utils/fileUtills";

// Define input and output files
const inputFilePath = "./data/input.txt";
const outputFilePath = "./data/output.txt";

console.log(`Reading file from path ${inputFilePath}`);

// Read the input file (./data/input.txt)
try {
  const inputData = FileUtils.readFile(inputFilePath);

  // Parse the input data
  const { area, adventurers } = ParserUtils.parseInputData(inputData);

  // Show the map in the console
  console.log("Displaying map:");
  console.log(area.displayMap());

  // Add adventurers and execute their movements
  adventurers.forEach((adventurer) => {
    adventurer.executeMovementSequence();
  });

  // Format output data
  const outputData = ParserUtils.formatOutputData(area, adventurers);

  // Write the formatted result to the output file (./data/output.txt)
  FileUtils.writeFile(outputFilePath, outputData);

  console.log(`Successfully wrote output file: ${outputFilePath}`);
} catch (err) {
  console.error(`Unexpected error: ${err}`);
}
