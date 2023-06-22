import { Game } from "./models/game";

// Define input and output files
const inputFilePath = "./data/input.txt";
const outputFilePath = "./data/output.txt";

const game = new Game(inputFilePath, outputFilePath);
game.init();
game.run();
game.saveResults();
