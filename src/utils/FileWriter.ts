import fs from "fs";
import path from "path";

class FileWriter {
  public writeFile(filePath: string, data: string): void {
    try {
      if (path.extname(filePath) !== ".txt") {
        throw new Error("Invalid file type. Only .txt files are allowed.");
      }

      fs.writeFileSync(path.resolve(filePath), data, "utf-8");
    } catch (error) {
      console.error(`Error writing file to path ${filePath}`, error);
    }
  }
}

export default FileWriter;
