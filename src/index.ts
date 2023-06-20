import { ParserUtils } from "./utils/parserUtils";
import { FileUtils } from "./utils/fileUtills";

// Define input and output files
const inputFilePath = "./data/input.txt";
const outputFilePath = "./data/output.txt";

console.log(`Reading file from path ${inputFilePath}`);

// Read the input file (./data/input.txt)
const inputData = FileUtils.readFile(inputFilePath);

const { area, adventurers } = ParserUtils.parseInputData(inputData);

// Add adventurers and execute their movements
adventurers.forEach((adventurer) => {
  adventurer.executeMovementSequence();
});

console.log(area.grid);
console.log(adventurers);

// Format output data
const outputData = ParserUtils.formatOutputData(area, adventurers);

// Write the formatted result to the output file (./data/output.txt)
FileUtils.writeFile(outputFilePath, outputData);

console.log(`Successfully wrote output file: ${outputFilePath}`);
