import FileReader from "./utils/FileReader";
import FileWriter from "./utils/FileWriter";
import { Area } from "./models/Area";
import { Adventurer } from "./models/Adventurer";
import { Parser } from "./utils/Parser";

// Instancier les classes FileReader et FileWriter
const fileReader = new FileReader();
const fileWriter = new FileWriter();

// Définir fichiers d'entrée et de sortie
const inputFilePath = "./data/input.txt";
const outputFilePath = "./data/output.txt";

console.log(`Reading file from path ${inputFilePath}`);

// Lire le fichier d'entrée (./data/input.txt)
const inputData = fileReader.readFile(inputFilePath);

const { area, adventurers } = Parser.parseInputData(inputData);

// Ajouter des aventuriers et execution de leurs mouvements
adventurers.forEach((adventurer) => {
  adventurer.executeMovementSequence();
});

console.log(area.grid);
console.log(adventurers);

// Formattage des données de sortie
const outputData = Parser.formatOutputData(area, adventurers);

// On écrit le résultat de formattage dans le fichier de sortie (./data/output.txt)
fileWriter.writeFile(outputFilePath, outputData);

console.log(`Successfully wrote output file: ${outputFilePath}`);
