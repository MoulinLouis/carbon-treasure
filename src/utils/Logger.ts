const fs = require("fs");
import path from "path";

export class Logger {
  private static filePath = "./data/log.txt";

  public static log(message: string) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(
      path.resolve(this.filePath),
      `${timestamp} - ${message}\n`
    );
  }
}
