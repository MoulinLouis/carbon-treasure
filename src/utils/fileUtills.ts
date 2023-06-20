import fs from "fs";
import path from "path";

export class FileUtils {
  public static readFile(filePath: string): string {
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

  public static writeFile(filePath: string, data: string): void {
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
