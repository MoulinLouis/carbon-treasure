import FileReader from "./utils/FileReader";
import FileWriter from "./utils/FileWriter";

// Instancier les classes FileReader et FileWriter
const fileReader = new FileReader();
const fileWriter = new FileWriter();

// Définir fichiers d'entrée et de sortie
const inputFilePath = "./data/input.txt";
const outputFilePath = "./data/output.txt";

console.log(`Reading file from path ${inputFilePath}`);

// Lire le fichier d'entrée
const inputData = fileReader.readFile(inputFilePath);

// Ecrire le même contenu dans le fichier de sortie
fileWriter.writeFile(outputFilePath, inputData);

console.log(`Successfully wrote output file: ${outputFilePath}`);
