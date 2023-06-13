import fs from "fs";
import path from "path";

class FileReader {
  public readFile(filePath: string): string {
    try {
      if (path.extname(filePath) !== ".txt") {
        throw new Error("Invalid file type. Only .txt files are allowed.");
      }

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const data = fs.readFileSync(path.resolve(filePath), "utf-8");
      return data;
    } catch (error) {
      console.error(`Error reading file from path ${filePath}`, error);
      return "";
    }
  }
}

export default FileReader;
