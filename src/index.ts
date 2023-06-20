import { Area } from "./models/area";
import { Adventurer } from "./models/adventurer";
import { ParserUtils } from "./utils/parserUtils";
import { FileUtils } from "./utils/fileUtills";

// Définir fichiers d'entrée et de sortie
const inputFilePath = "./data/input.txt";
const outputFilePath = "./data/output.txt";

console.log(`Reading file from path ${inputFilePath}`);

// Lire le fichier d'entrée (./data/input.txt)
const inputData = FileUtils.readFile(inputFilePath);

const { area, adventurers } = ParserUtils.parseInputData(inputData);

// Ajouter des aventuriers et execution de leurs mouvements
adventurers.forEach((adventurer) => {
  adventurer.executeMovementSequence();
});

console.log(area.grid);
console.log(adventurers);

// Formattage des données de sortie
const outputData = ParserUtils.formatOutputData(area, adventurers);

// On écrit le résultat de formattage dans le fichier de sortie (./data/output.txt)
FileUtils.writeFile(outputFilePath, outputData);

console.log(`Successfully wrote output file: ${outputFilePath}`);
